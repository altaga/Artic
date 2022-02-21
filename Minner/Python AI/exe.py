import matplotlib.pyplot as plt
import torch
from torch.utils.data import DataLoader
from torch.autograd import Variable
from model import *
from utils.utils import *
from utils.datasets import *
import os
from PIL import Image
import cv2
import math
from random import randrange
import requests
import time

# Value 240 in person, only for testing, the real value for the streets is 70
objects=[240,220,120,50] #person:70, cars:220, motorcycle:120, dogs:50

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Set up model and classes
model = Darknet("yolov3.cfg", img_size=416).to(device)
model.load_darknet_weights("yolov3.weights")
model.eval()  # Set in evaluation mode
classes = load_classes("coco.names")  # Extracts class labels from file

# Global variables 

distance=100000     #Seed distance
distancemem=100000  #Seed memory distance
labelmem=""
labelmod=""
pos=""
imag=""
imgs = []  # Stores image paths
img_detections = []  # Stores detections for each image index
i = randrange(10)

h = 0
c = 0
m = 0
d = 0
fps=0

vid = cv2.VideoCapture(0)

apiCall = time.time()

while(True):
    h = 0
    c = 0
    m = 0
    d = 0
    fps=0
    ret, frame = vid.read()
    cv2.imwrite("temp-img/c1.png", frame)
    imag=""
    imgs = []  # Stores image paths
    img_detections = []  # Stores detections for each image index

    start_time = time.time()

    dataloader = DataLoader(
        ImageFolder("temp-img", img_size=416),
        batch_size=1,
        shuffle=False,
        num_workers=0,
    )

    Tensor = torch.cuda.FloatTensor if torch.cuda.is_available() else torch.FloatTensor

    for batch_i, (img_paths, input_imgs) in enumerate(dataloader):
        # Configure input
        input_imgs = Variable(input_imgs.type(Tensor))

        # Get detections
        with torch.no_grad():
            detections = model(input_imgs)
            detections = non_max_suppression(detections, 0.8, 0.4)

        imgs.extend(img_paths)
        img_detections.extend(detections)
        
    fps = round((1/(time.time() - start_time)),2)

    print("--- %s FPS ---" % fps)

    for img_i, (path, detections) in enumerate(zip(imgs, img_detections)):
        img = np.array(Image.open(path))
        imag = cv2.imread(path)
        (H, W) = imag.shape[:2]
        if detections is not None:
            detections = rescale_boxes(detections, 416, img.shape[:2])
            for x1, y1, x2, y2, conf, cls_conf, cls_pred in detections:
                if(x1>5000 or y2>5000 or y1>5000 or x2>5000):
                    # False Detection Low-Pass Filter
                    break
                i=0
                if(classes[int(cls_pred)]=="motorbike"):
                    m +=1
                    i=i+1
                elif(classes[int(cls_pred)]=="dog"):
                    d+=1
                    i=i+2
                elif(classes[int(cls_pred)]=="person"):
                    h+=1
                    i=i+3
                elif(classes[int(cls_pred)]=="car"):
                    c+=1
                    i=i+4
                COLORS1 = int(254 * abs(math.sin(i)))
                COLORS2 = int(254 * abs(math.sin(i+1)))
                COLORS3 = int(254 * abs(math.sin(i+2)))
                color= (COLORS1,COLORS2,COLORS3)
                cv2.rectangle(imag, (int(x1), int(y1)), (int(x2), int(y2)), color, 2)
                cv2.putText(imag, classes[int(cls_pred)],(int(x1), int(y1)-20), cv2.FONT_HERSHEY_SIMPLEX, 1, color, 1, cv2.LINE_AA)

    resized = cv2.resize(imag, (900,675), interpolation = cv2.INTER_AREA)
    cv2.imshow("Image", resized)
    print("Human : {}, Cars : {}, Motorcycle : {}, Dogs : {}, FPS : {}".format(h,c,m,d,fps))
    if(time.time() - apiCall > 60):
        url = "http://127.0.0.1:8080/send?humans={}&cars={}&motor={}&dogs={}&fps={}".format(h,c,m,d,fps)
        response = requests.request("GET", url)
        print(response.text)
        apiCall = time.time()
    key = cv2.waitKey(1) & 0xFF
    if key == ord('q'):
        break

cv2.destroyAllWindows()