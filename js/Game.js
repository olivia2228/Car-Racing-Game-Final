class Game {
    //why is construtor empty?
    constructor() {
    }
    //function gets state from database
    getState() {
        //refers to the gameState child of database
        var gameStateref = db.ref("gameState")
        //creates a continuous listener
        //explain
        gameStateref.on("value", function (data) {
        //extracts the necessary information from the gameState data    
            gameState = data.val()
        })
    }
    //why do we need an updateState function?
    //do we put the condition in circle bracket
    //why don't we write gameState
    updateState(state) {
        //db refers to the database for updating the gameState
        //why do we put colon
        db.ref("/").update({ gameState: state })
    }
    //creates an asynchronous function
    async start() {
        //comparing gameState and 0
        if (gameState === 0) {
            //creates a player object from Player class 
            player = new Player()
            //it waits for db to refer to the playerCount child value of the database and creates a one-time listener
            var playerCountRef = await db.ref("playerCount").once("value")
            //if playerCountRef fetches the information then only execute the next lines
            if (playerCountRef.exists()) {
                //extracts the necessary information from data brought by playerCountRef
                //shouldn't we define a variable for playerCount
                playerCount = playerCountRef.val()
                //calls the getPlayerCount 
                player.getPlayerCount()
            }

            form = new Form()

            form.display()
        }
        car1 = createSprite(200, 200)
        car2 = createSprite(400, 200)
        car3 = createSprite(600, 200)
        car4 = createSprite(800, 200)
        car1.addImage("car1", car1Img)
        car2.addImage("car2", car2Img)
        car3.addImage("car3", car3Img)
        car4.addImage("car4", car4Img)


        cars = [car1, car2, car3, car4]

    }

    play() {
        form.hide()
        Player.getPlayerInfo()
        player.getCarsAtEnd()
        if (allPlayers !== undefined) {
            background(groundImg)
            image(trackImg, 0, -windowHeight * 4, windowWidth, windowHeight * 5)
            var index = 0
            var x = 150
            var y = 0

            for (var plr in allPlayers) {
                index = index + 1
                x = x + 200
                y = windowHeight - allPlayers[plr].distance
                cars[index - 1].y = y
                cars[index - 1].x = x
                if (index === player.index) {
                    rectMode(CENTER)
                    fill("red")
                    rect(x, y, 100, 100)
                    camera.position.x = windowWidth / 2
                    camera.position.y = y
                }
                //text(allPlayers[plr].name+" : "+allPlayers [plr].distance,100,displayPosition)
                //displayPosition=displayPosition+20
            }
            if (keyIsDown(UP_ARROW) && player.index !== null) {
                player.distance = player.distance + 50
                player.update()
            }
            if (player.distance > windowHeight * 5) {
                gameState = 2
                player.rank=player.rank+1
                Player.updateCarsAtEnd(player.rank)
            }

            drawSprites()

        }

    }
    end() {

        
        console.log("gameEnded")
        console.log(player.rank)
    }

}