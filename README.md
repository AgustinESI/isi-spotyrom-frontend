# SpotyROM-Frontend


<div align="center" style="margin-top: 20px; margin-bottom: 50px;">
  <img src="https://github.com/AgustinESI/isi-spotyrom-frontend/assets/73068658/9587f27e-fd23-435b-9d8f-c27338070a20" width="150" alt="Your Image Description">
</div>


![Angular.js](https://img.shields.io/badge/angular.js-%23E23237.svg?style=for-the-badge&logo=angularjs&logoColor=white)
![Firebase](https://img.shields.io/badge/firebase-a08021?style=for-the-badge&logo=firebase&logoColor=ffcd34)
![Spotify](https://img.shields.io/badge/Spotify-1ED760?style=for-the-badge&logo=spotify&logoColor=white)
![YouTube](https://img.shields.io/badge/YouTube-%23FF0000.svg?style=for-the-badge&logo=YouTube&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![Edge](https://img.shields.io/badge/Edge-0078D7?style=for-the-badge&logo=Microsoft-edge&logoColor=white)

## Whats SpotyROM

Project developed for the implementation of a digital application that integrates up to 5 web services. The implementation is MVP, which involves creating an initial version of a product with a minimal set of features that is sufficient to attract early users and validate the concept's viability.
<hr>

Additionally, the system has been developed using agile SCRUM methodologies, planned in 4 sprints:

- Sprint 1 (February 27)
- Sprint 2 (March 5)
- Sprint 3 (April 2)
- Sprint 4 (April 16)

# Startup service
There are tow main ways to startup the application service, using NodeJS running un your local machine or using Docker

## Angular

If u have [NodeJS](https://nodejs.org/en) already in your computer you have to follow the next steps:

  - Build `npm install --force` for installing the app.
  - Run `npm start` for starting the app. It will open automatically the path `http://localhost:4200/` in your default browser. 


## Docker
Also the application is able to run thanks to [Docker](https://www.docker.com/) by following the next steps:

### Create image

There are two ways to create a docker images:

  - Create image using ``Visual Studio``

    1. Install Extension `Docker` into `Visual Studio`
    2. After installing, open ``Dockerfile`` file and do rigth click and click ``Build Image`` and press enter when pop-up is visible.

  - On the other hand, you have to open PowerShell terminal and execute the next command:
    ```
        docker build --pull --rm -f "Dockerfile" -t spotyrom:latest "." 
    ```

### Run service
Once you have created the image for running the service you have to open the PowerShell and execute the next command.

  ``` terminal
    docker run -p 4200:4200 spotyrom   
  ```

## Documentation
The complete SpotyROM documentation can be found [here](https://github.com/AgustinESI/isi-spotyrom-frontend/wiki).

## Authors
Developed by Agustín Sánchez Martín

- Email: Agustin.Sanchez9@alu.uclm.es
- Web: [agustinsanchezmartin](https://agustinesi.github.io/).
- LinkedIn: [Agustín Sánchez Martín](https://linkedin.com/in/agustin-sanchez-martin).

## License
This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/AgustinESI/isi-spotyrom-frontend/blob/main/LICENSE) file for details.

