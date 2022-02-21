# Artic
 AI and Blockchain platform.

 Hi!, if you are a judge and want to review the AI model running in GoogleColab here are the notebooks.

[YOLOv3](https://colab.research.google.com/github/altaga/Artic/blob/main/Minner/Python%20AI/YoloV3.ipynb)
 
 # Introduction and Problem:

 https://www.articprotocol.online

 # Solution:

Artic es una plataforma decentralizada de Oraculos basados en el procesamiento de AI en Edge.

 ## System's Architecture:

<img src="./Images/general.png">

 # WebApp UI:

 ## Landing:

 Como parte de la solucion tenemos nuestra pagina de inicio, donde explicamos el proyecto puedes revisar toda nuestra documentacion.

<img src="./Images/ui1.png">

 ## AI Service:

En nuestra pagina de AI service podras ver uno de nuestros oraculos alimentando a su contrato en tiempo real, todos esto puedes revisando directamente en el Explorer de Aurora.

<img src="./Images/ai.png">

En este caso este oraculo obtiene sus datos del procesamiento en edge de imagenes en una jetson nano a travez del modelo YOLOv3, este es un ejemplo practico de como podria ser alimentado el oraculo con un modelo de AI.

<img src="./Images/ui2.png">

## TIC Faucet:

Como parte de nuetro sistema, creamos una ERC-20 token con el fin de poder proveer un incentivo para los mineros que se unan a nuestra plataforma de AI.

<img src="./Images/token.png">

Si quieres obtener algunos token de prueba porfavor entra a la pagina de la Facuet y sigue las intruccines ahi mencionadas.

<img src="./Images/token2.png">

## Payment:

Como parte de las rewards que queremos darle a los mineros por proveer informacion a los oraculos, como proveedores podemos realizar un pago directo de nuestra token desde la pestaña de payment, si quieres probar el mandar algo de TIC a uno de ellos primero revisa la seccion de [Faucet](#tic-faucet)

<img src="./Images/pay.png">

Los botones de Pay son funcionales, prueba el mandar algo de TIC a alguno de los mineros por su buen trabajo.

<img src="./Images/pay2.png">

Al hacer clic en las direcciones de los mineros puedes ver sus Address y ver las interacciones con los nodos directamente.

 ## What's next for Artic:

 Appendix I:

 Nodes and Oracles information:

| Device     | Address                                    | Kind                  |
| ---------- | ------------------------------------------ | --------------------- | 
| Jetson 1   | [0x0d608FBa0b1F7CF8015e052aDb5dC7D9fFAa753d](https://explorer.testnet.aurora.dev/address/0x0d608FBa0b1F7CF8015e052aDb5dC7D9fFAa753d/transactions) | Human Detection       |
| Jetson 1   | [0xe3C99a49eD7E6c14c03650394F5DB1A35A2177b5](https://explorer.testnet.aurora.dev/address/0xe3C99a49eD7E6c14c03650394F5DB1A35A2177b5/transactions) | Cars Detection        |
| Jetson 1   | [0x8510eCC6a9974B992337553D62eF5B32c93D841c](https://explorer.testnet.aurora.dev/address/0x8510eCC6a9974B992337553D62eF5B32c93D841c/transactions) | Motorcycles Detection |
| Jetson 1   | [0x039E0a3fa88288a3305c0053BbC9e2A114d217db](https://explorer.testnet.aurora.dev/address/0x039E0a3fa88288a3305c0053BbC9e2A114d217db/transactions) | Dogs Detection        |
| Jetson 1   | [0xF2D7621a6CE7fa4171C4a93eb41035f647a486BE](https://explorer.testnet.aurora.dev/address/0xF2D7621a6CE7fa4171C4a93eb41035f647a486BE/transactions) | FPS Register          |
| Jetson 2   | [0x49e745675a6337F6483270466df148501cf7D1DB](https://explorer.testnet.aurora.dev/address/0x49e745675a6337F6483270466df148501cf7D1DB/transactions) | Human Detection       |
| Jetson 2   | [0xec7702B9d8Ff5dCf3cE4f1Fd2f4E93495aAe631c](https://explorer.testnet.aurora.dev/address/0xec7702B9d8Ff5dCf3cE4f1Fd2f4E93495aAe631c/transactions) | Cars Detection        |
| Jetson 2   | [0x9F30E32223F72F3c9e509FAEC4C345eCF1fDa2e5](https://explorer.testnet.aurora.dev/address/0x9F30E32223F72F3c9e509FAEC4C345eCF1fDa2e5/transactions) | Motorcycles Detection |
| Jetson 2   | [0x9d939199329A1deE84d1b29dEC247B0b89b88F32](https://explorer.testnet.aurora.dev/address/0x9d939199329A1deE84d1b29dEC247B0b89b88F32/transactions) | Dogs Detection        |
| Jetson 2   | [0x5432c58ffF160417E757A78Af9a4360dC4Efb27D](https://explorer.testnet.aurora.dev/address/0x5432c58ffF160417E757A78Af9a4360dC4Efb27D/transactions) | FPS Register          |
| Aggregator | [0xcDff32Cf5616Cb0F8001AA7e57AD103f0dc85dA2](https://explorer.testnet.aurora.dev/address/0xcDff32Cf5616Cb0F8001AA7e57AD103f0dc85dA2/transactions) | Human Detection       |
| Aggregator | [0x952C57f58B6edbb16eDD376f2E45892c613Ec39B](https://explorer.testnet.aurora.dev/address/0x952C57f58B6edbb16eDD376f2E45892c613Ec39B/transactions) | Cars Detection        |
| Aggregator | [0x71e4CCA3f245BB7189c866e4a0Fd192128FF82F1](https://explorer.testnet.aurora.dev/address/0x71e4CCA3f245BB7189c866e4a0Fd192128FF82F1/transactions) | Motorcycles Detection |
| Aggregator | [0x781390c4Bc6c5e03ceDf6e68881eA6077F06E0E9](https://explorer.testnet.aurora.dev/address/0x781390c4Bc6c5e03ceDf6e68881eA6077F06E0E9/transactions) | Dogs Detection        |
| Aggregator | [0xe66dAee629345eD9F231CC5C87B68EbCD1E69aA9](https://explorer.testnet.aurora.dev/address/0xe66dAee629345eD9F231CC5C87B68EbCD1E69aA9/transactions) | FPS Register          |

Token Contract:

Artic Token [0x42cD5De0ba1a8c05d9C79726db57bAeBCF0915Af](https://explorer.testnet.aurora.dev/token/0x42cD5De0ba1a8c05d9C79726db57bAeBCF0915Af/token-transfers)



IMAGENES PARA EL DOK BORRAR ALV

<img src="./Images/ui1.png">
<img src="./Images/ui2.png">
<img src="./Images/jetson1.jpg">
<img src="./Images/jetson2.png">
<img src="./Images/general.png">
<img src="./Images/pay2.png">
