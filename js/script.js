
// Array of Ship Values as object
const SHIPVALUES = [{name: 'aircraft-carrier', length: 5}, {name: 'battleship', length: 4}, {name: 'submarine', length: 3}, {name: 'cruiser', length: 3}, {name: 'destroyer', length: 2}];

// Double Array of all of the Cell Names as strings
const CELLNAMES = [['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'a9', 'a10'],
    ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9', 'b10'],
    ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10'],
    ['d1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9', 'd10'],
    ['e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8', 'e9', 'e10'],
    ['f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'f10'],
    ['g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8', 'g9', 'g10'],
    ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8', 'h9', 'h10'],
    ['i1', 'i2', 'i3', 'i4', 'i5', 'i6', 'i7', 'i8', 'i9', 'i10'],
    ['j1', 'j2', 'j3', 'j4', 'j5', 'j6', 'j7', 'j8', 'j9', 'j10']];

// Double Array of Cell info as objects - one value name from CELLNAMES - one value column coord - one value row coord
// This was done to avoid typing out all of the values for each 100 objects
const CELLNAMEVALUES = [];
CELLNAMES.forEach(function(row, rowCounter){
    let placeHolderRow = [];
    row.forEach(function(cell, columnCounter){
        let placeHolderCell = {};
        placeHolderCell.name = cell;
        placeHolderCell.rowCoord = rowCounter;
        placeHolderCell.columnCoord = columnCounter;
        placeHolderRow.push(placeHolderCell);
    });
    CELLNAMEVALUES.push(placeHolderRow);
});

// Cache HTML Elements
let humanTableElement = document.querySelector('#human-table');
let aiTableElement = document.querySelector('#ai-table');
let errorElement = document.querySelector('#instructions-content');
let verticalRadioElement = document.querySelector('#orientation-vertical');
let horizontalRadioElement = document.querySelector('#orientation-horizontal');
let instructionElement = document.querySelector('.error-section');
let submitButtonElement = document.querySelector('.submit-button');


class Ship { // Ship Class - represents an individual ship and its status vis a vis the game
    constructor(shipValue, table, isHuman){
        this.shipValue = shipValue; // from SHIPVALUES
        this.table = table; // matching table object
        this.isHuman = isHuman; // does this belong to the human player
        this.name = shipValue.name;  // string name of the ship (for display)
        this.length = shipValue.length; // number of cells in the ship
        this.isSunk = false; // if the ship has been sunk
        this.isVertical = false; // if the ship is vertical (for placement of ship)
        this.conditions = []; // representation of if each cell in the chip is hit
        this.conditions.length = this.length; 
        this.conditions.fill(false); // initialized as false
        this.locations = []; // representation of the cell objects where the ship is located
    }

    placeShip(firstCell){ // establishes the locations array for this ship
        // the parameter is the leftmost or topmost cell
        let holderCell;
        for(let i = 0; i < this.length; i++){ // iterates once for each cell of the ship
            if(this.isVertical){
                holderCell = returnCellRelative(this.table, firstCell, i, 0); // sets the cell variable along the row axis
            }
            else{
                holderCell = returnCellRelative(this.table, firstCell, 0, i); // sets the cell variable along the column axis
            }
            this.locations.push(holderCell); // pushes to locations array
            holderCell.placeShip(this.name); // calls the cells placeShip method with this ships name as argument
        }
    }
     
    setVerticalTo(isVertical){ // simple setter method for the ships isVertical variable
        this.isVertical = isVertical;
    }

    hit(cell){  // function to hand a cell on this ship getting hit. It is passed from this ship's table
        // the parameter is the cell that was hit
        this.conditions[this.locations.findIndex(location => location === cell)] = true; // this sets the value of the conditions array that matches with 
        // the hit cell to be true
        cell.hit();  // this calls the cells hit function
        if(this.conditions.every(condition => condition === true)){ // if all values in conditions are true (all cells are hit)
            this.isSunk = true;
            this.locations.forEach(function(location){ // calls cells sunk method for all cells in ship
                location.sunk();
            });
            return true; // tells invoker that ship did sink
        }
        else {
            return false; // tells invoker ship didnt sink
        }
    }
}

class Table{ // the table class represents a game board for a player - but also contains a lot of the working information
    // about the state of the game - it contains as variables the ships and cells that are a part of it, and handles
    // most of the logic regarding the display of the boards.
    constructor(isHuman, tableElement){
        this.isHuman = isHuman;
        this.tableElement = tableElement; // the HTML element containing the board that the table represents
        this.ships = []; // an array of all of the ship objects on this player's board - empty before ships are placed
        this.shipsSunk = 0; // counter for sunk ships

        // this is a block of code that creates the cells within the table
        // both the HTML element and the JS Object are created within the table constructor
        let cellsUnderConstruction = [];
        CELLNAMEVALUES.forEach(function(row, i){ // parse through CELLNAMEVALUES for proper 10by10 format and data availability
            let rowUnderConstruction = [];
            row.forEach(function(cell, j){
                let divUnderConstruction = document.createElement('div');
                divUnderConstruction.classList.add('cell'); // creates new div and adds cell class 
                divUnderConstruction.id = CELLNAMEVALUES[i][j].name; // new div's id is its Letter-Number coords, for easy reference
                tableElement.append(divUnderConstruction); // appends this div to the tables element
                let cellUnderConstruction = new Cell(divUnderConstruction, isHuman, CELLNAMEVALUES[i][j]); // constructs the cell
                // passes the html element, the tables isHuman variable, and the object from CELLNAMEVALUES for this cell
                rowUnderConstruction.push(cellUnderConstruction);
                // pushes the cell to the temporary row array
            });
            cellsUnderConstruction.push(rowUnderConstruction); // pushes the now complete temporary row array to the tables cells array
        });
        this.cells = cellsUnderConstruction; // an array of all of the cell objects in this table

        // these variables are arrays which are lists of certain categories of cells
        // they are used to check if a cell chosen by an oppoent has already been chosen
        // or if it will hit or miss. Because Table is constructed with an empty Ships array
        // they must be filled after the Table's Ships array is filled
        this.healthyShipCells = []; // represents the cells with healthy (unhit) ships
        this.hitShipCells = []; // represents the cells with hit ships - stays empty during initialization
        this.emptyCells = []; // represents the cells with no ship that have not yet been missed
        this.missedCells = []; // represents the missed cells - stays empty during initialization
    }

    setAShip(ship, cell){ // adds a ship to the ship array and places it for the Ship object
        // note that this must be done in ship order (as in global constant)
        this.ships.push(ship);
        ship.placeShip(cell);
    }

    fillCellArrays(){ // fills up the arrays of cells after ships array has been set
        let healthyCellsToPush = [];
        this.ships.forEach(function(ship){
            ship.locations.forEach(function(location){
                healthyCellsToPush.push(location);
            });
        });
        this.healthyShipCells = healthyCellsToPush; // adds each cell of each ship to the array
        let emptyCellsToPush = [];
        this.cells.forEach(function(row){
            row.forEach(function(cell){
                if(healthyCellsToPush.includes(cell) === false){
                    emptyCellsToPush.push(cell); // looks through all cells in all the rows in the table and adds cell to array if its not a ship
                }
            });
        });
        this.emptyCells = emptyCellsToPush;
    }

    // this might be redundant with tableObject.cells[rowCoord][columnCoord]
    // i finished it so im going to keep it for now
    returnCell(rowCoord, columnCoord){ // returns the cell object given the coordinates of the cell
        let cellToReturn;
        this.cells.forEach(function(row){ // looks through each row
            cellToReturn = row.find(function(cell){ 
                return cell.cellNameValue.rowCoord === rowCoord && cell.cellNameValue.columnCoord === columnCoord; // finds cell that has the same coordinates
            });
        });
        return cellToReturn;
    }

    returnShip(shipName){ // returns the tables ship object given a matching ship name 
        return this.ships.find(function(ship){
            return ship.name === shipName;
        });
    }

    processShot(cell){ // this method processes a shot by either player onto their opponent taking a cell object as its parameter
        //it returns a number value depending on the result as well as dealing with the logic of the results of the shot
        if(this.hitShipCells.includes(cell) || this.missedCells.includes(cell)){
            return 0; // returns 0 if the cell has already been hit or missed
        }
        else if(this.emptyCells.includes(cell)){ // if this cell is empty (no ship)
            this.emptyCells = this.emptyCells.filter(emptyCell => emptyCell !== cell);
            this.missedCells.push(cell); // removes cell from emptyCell array and adds it to missedCell array
            cell.miss(); // calls the cells miss function
            return 1; // returns 1 indicating a miss
        }
        else{ // if this cell has a ship that is healthy
            this.healthyShipCells = this.healthyShipCells.filter(healthyShipCell => healthyShipCell !== cell); 
            this.healthyShipCells.push(cell); // removes from healthyShips array and adds to hitShips array
            let isSunk = this.ships.find(ship => ship.locations.includes(cell)).hit(cell); // finds the ship that was hit
            if(isSunk){
                this.shipsSunk++; // increases counter for sunk ships
                // TODO: update HTML element for sunk ship
                if(this.shipsSunk === 5){ // checks if all ships are sunk
                    // TODO: this ends the game
                    return 4; // returns 4 indicating all ships now sunk
                }
                return 3; // returns 3 indicating a ship sunk but not all ships sunk
            }
            return 2; // returns 2 indicating a hit but no sink
        }
    }
}

class Cell{ // class to represent a single cell - like ship it belongs to a table
    // this is where the visual effects are applied via the classList property and css
    constructor(cellElement, isHuman, cellNameValue){
        this.cellElement = cellElement; // the HTML element tied to the object
        this.isHuman = isHuman; // if the player is Human
        this.cellNameValue = cellNameValue; // object with the coordinates represented as numbers and as a string (from CELLNAMEVALUES array)
        this.type = ''; // the Name of the ship in this cell, if there is one
        if(this.isHuman){
            this.cellElement.classList.add('water'); // sets the initial style of a humans cell to be empty water
        }
        else{
            this.cellElement.classList.add('fog-of-war'); // sets the intial style of an AIs cell to be fog-of-war
        }
    }

    placeShip(name){ // this method handles placing a ship in this cell
        // it is called by the ship object being placed, which passes its name as a parameter
        this.type = name;
        if(this.isHuman){
            this.cellElement.classList.remove('water'); // changes style from empty water to a healthy ship if on players board
            this.cellElement.classList.add('healthy-ship');
            this.cellElement.textContent = this.type.slice(0,1); // also adds text of ship type on player board
        }
    }

    hit(){  // this method handles a ship in this cell being hit
        if(this.isHuman){
            this.cellElement.classList.remove('healthy-ship');
        }
        else{
            this.cellElement.classList.remove('fog-of-war');
            this.cellElement.textContent = '?'; // adds texts indicating unknown type of ship if on ai board
        }
        this.cellElement.classList.add('hit-ship'); // TODO: changes cell style to hit ship 
    }

    miss(){ // this method handles a player missing in this cell
        if(this.isHuman){
            this.cellElement.classList.remove('water');
        }
        else{
            this.cellElement.classList.remove('fog-of-war');
        }
        this.cellElement.classList.add('miss'); // TODO: changes cell style to miss
    }

    sunk(){ // this method fires when the ship on this cell is sunk
        this.cellElement.classList.remove('hit-ship'); 
        this.cellElement.classList.add('sunk-ship'); // TODO: changes cell style to sunk ship
        this.cellElement.textContent = this.type.slice(0,1); // sets cell text as the ships type
    }
}


// non class functions

function placeAiShips(aiShips, aiTable){ // this function handles the placement of the AI ships
    // the parameters are an array of ships, and the table object
    // the placemnt is done randomly via trial and error - a possible addition could add strategy to placement
    aiShips.forEach(function(ship){
        while(ship.locations.length === 0){ 
            let randRow = Math.floor(Math.random() * 10); // 2 random numbers 0-9 for the coordinates, 1 random number 0-1 to determine orientation
            let randColumn = Math.floor(Math.random() * 10);
            let randOrientation = Math.floor(Math.random() * 2);
            ship.setVerticalTo(Boolean(randOrientation)); // sets the ships verticality to true if 1, false if 0
            let startCell = aiTable.cells[randRow][randColumn]; // grabs the cell with the random coordinates
            if(isShipPlacementValid(startCell, ship, aiTable) === 0){
                aiTable.setAShip(ship, startCell);
            }
        } 
    });
    aiTable.fillCellArrays();
}

function isShipPlacementValid(cell, ship, table){ // function to check for validity of ship placement
    // takes as parameters the cell of top or leftmost cell in ship (the cell picked by human or ai),
    // the ship object being placed, and the table its being placed on
    let cellToCheck;
    for(let i = 0; i < ship.length; i++){ // checks as many cells as the length of the ship
        if(ship.isVertical){
            cellToCheck = returnCellRelative(table, cell, i, 0); // sets the cell to check if the ship is vertical
            if(cellToCheck === undefined){
                return 1;
            } 
            else if(table.ships.some(e => e.locations.includes(cellToCheck))){
                // this occurs if the cell is undefined (not in the 10by10) or is already placed
                // the second check has to check the ship object's locations array because the table
                // object's cell arrays have not yet been defined
                return 2;
            }
        }
        else{
            cellToCheck = returnCellRelative(table, cell, 0, i)  // sets the cell to check if the ship is horizontal
            if(cellToCheck === undefined){
                return 1;
            }
            else if(table.ships.some(e => e.locations.includes(cellToCheck))){
                return 2;
            }
        }
    }
    return 0; // final return statement if each potential cell passes the checks
}

function updateTextElement(element, message){
    element.textContent = message;
}

function generateAIMoveDumb(){
    let targetIsGood = false;
    while(!targetIsGood){
        let randRow = Math.floor(Math.random() * 10);
        let randColumn = Math.floor(Math.random() * 10);
        if(humanTable.processShot(humanTable.cells[randRow][randColumn]) !== 0){
            targetIsGood = true;
        }
    }
    return;
}

function returnCellRelative(table, cell, relRow, relColumn){ // returns the relative cell given a table, cell, and relative row and column coordinates
    let initRow = cell.cellNameValue.rowCoord;
    let initColumn = cell.cellNameValue.columnCoord;
    if(initRow+relRow > 9 || initColumn+relColumn > 9){ // checks for invalid cell to prevent error
        return undefined; // returns undefined if cell is invalid
    }
    else{
        return table.cells[initRow + relRow][initColumn + relColumn];
    }
}

function addClassToCells(cells, className){
    cells.forEach(function(cell){
        cell.cellElement.classList.add(className);
    });
}

function removeClassFromCells(cells, className){
    cells.forEach(function(cell){
        cell.cellElement.classList.remove(className);
    });
}


// Initialize
 
    // Set starting values to what they should be  TODO:


// function initialize(){TODO: 
    verticalRadioElement.disabled = false;
    horizontalRadioElement.disabled = false;
    horizontalRadioElement.checked = true;
    submitButtonElement.disabled = true;
    updateTextElement(errorElement, '');


    let humanTable = new Table(true, humanTableElement);
    let aiTable = new Table(false, aiTableElement);
    // at this point the tables and cells exist on the DOM and are displaying blank as the start of the game

    let humanShips = [];
    let aiShips = [];

    SHIPVALUES.forEach(function(shipValue){
        let humanShipBeingConstructed = new Ship(shipValue, humanTable, true);
        let aiShipBeingConstructed = new Ship(shipValue, aiTable, false);
        humanShips.push(humanShipBeingConstructed);
        aiShips.push(aiShipBeingConstructed);
    });
    // at this point the ship objects (in arrays) exist for each player, are associated with that player and that table, but are not associated with any cell objects
    // and have empty location values

    placeAiShips(aiShips, aiTable);
    // at this point the ai ship object array has been filled, and the ai table object and its constituent cell objects and ship objects are ready for the game
    // now the player must place their ships
    
    let checkerArray = [];
    let submitBoolean = false;
    let shipCounter = 0;
    let currentShip = humanShips[shipCounter];
    let message = `You are placing ${currentShip.name}. It has ${currentShip.length} cells. Select the radio option of your desired orientation - horizontal is default. Then click top or left cell of the ship.`;
    updateTextElement(instructionElement, message);
    let selectedCell;

    humanTableElement.addEventListener('click', function(event){
        if(shipCounter < 5){
            currentShip = humanShips[shipCounter];
            humanTable.cells.forEach(function(row){
                row.forEach(function(cell){
                    if(event.target.id === cell.cellNameValue.name){
                        selectedCell = cell;
                    }
                })
            });
            submitButtonElement.addEventListener('click', buttonPress);

            if(checkerArray.length === 0){
                let message = `You are placing ${currentShip.name}. It has ${currentShip.length} cells. Select the radio option of your desired orientation - horizontal is default. Then click top or left cell of the ship.`;
                updateTextElement(instructionElement, message);
                currentShip.setVerticalTo(!(horizontalRadioElement.checked));
                if(isShipPlacementValid(selectedCell, currentShip, humanTable) === 1){
                    updateTextElement(errorElement, 'This location cannot be selected. Part of the ship would hang off the grid. Please select a valid location.');
                    verticalRadioElement.disabled = false;
                    horizontalRadioElement.disabled = false;
                    submitButtonElement.disabled = true;
                    return;
                }
                else if(isShipPlacementValid(selectedCell, currentShip, humanTable) === 2){
                    updateTextElement(errorElement, 'This location would overlap an existing ship. Please select a valid location');
                    verticalRadioElement.disabled = false;
                    horizontalRadioElement.disabled = false;
                    submitButtonElement.disabled = true;
                    return;
                }
                else {
                    updateTextElement(errorElement, '');
                    for(let i = 0; i <  currentShip.length; i++){
                        if(currentShip.isVertical){
                            checkerArray.push(returnCellRelative(humanTable, selectedCell, i, 0));
                        }
                        else{
                            checkerArray.push(returnCellRelative(humanTable, selectedCell, 0, i));
                        }
                    }
                    removeClassFromCells(checkerArray, 'water');
                    addClassToCells(checkerArray, 'healthy-ship');
                    updateTextElement(instructionElement, `You have succesfully placed the ${currentShip.name}. All ${currentShip.length} cells are valid. Press the submit button if you wish to choose this location.`);
                    submitButtonElement.disabled = false;
                    verticalRadioElement.disabled = true;
                    horizontalRadioElement.disabled = true;
                }
            }
            else if(checkerArray.length !== 0 && !submitBoolean){
                currentShip.setVerticalTo(!(horizontalRadioElement.checked));
                if(isShipPlacementValid(selectedCell, currentShip, humanTable) === 1){
                    updateTextElement(errorElement, 'This location cannot be selected. Part of the ship would hang off the grid. Please select a valid location.');
                    removeClassFromCells(checkerArray, 'healthy-ship');
                    addClassToCells(checkerArray, 'water');
                    checkerArray = [];
                    verticalRadioElement.disabled = false;
                    horizontalRadioElement.disabled = false;
                    submitButtonElement.disabled = true;
                    return;

                }
                else if(isShipPlacementValid(selectedCell, currentShip, humanTable) === 2){
                    updateTextElement(errorElement, 'This location would overlap an existing ship. Please select a valid location');
                    removeClassFromCells(checkerArray, 'healthy-ship');
                    addClassToCells(checkerArray, 'water');
                    checkerArray = [];
                    verticalRadioElement.disabled = false;
                    horizontalRadioElement.disabled = false;
                    submitButtonElement.disabled = true;
                    return;
                }
                else {
                    updateTextElement(errorElement, '');
                    removeClassFromCells(checkerArray, 'healthy-ship');
                    addClassToCells(checkerArray, 'water');
                    checkerArray = [];
                    for(let i = 0; i <  currentShip.length; i++){
                        if(currentShip.isVertical){
                            checkerArray.push(returnCellRelative(humanTable, selectedCell, i, 0));
                        }
                        else{
                            checkerArray.push(returnCellRelative(humanTable, selectedCell, 0, i));
                        }
                    }
                    removeClassFromCells(checkerArray, 'water');
                    addClassToCells(checkerArray, 'healthy-ship');
                    updateTextElement(instructionElement, `You have succesfully placed the ${currentShip.name}. All ${currentShip.length} cells are valid. Press the submit button if you wish to choose this location.`);
                    submitButtonElement.disabled = false;
                    verticalRadioElement.disabled = true;
                    horizontalRadioElement.disabled = true;
                }
            }
        }
    });

    let playerMoves = 0;
    let aiMoves = 0;
    let selectedTargetCell;
    let allShipsSunk = false;
    let shotResult;
    aiTableElement.addEventListener('click', function(event){
        console.log('got here');
        aiTable.cells.forEach(function(row){
            row.forEach(function(cell){
                if(event.target.id === cell.cellNameValue.name){
                    selectedTargetCell = cell;
                }
            })
        });
        if(shipCounter === 5){
            if(!allShipsSunk){
                if(playerMoves === aiMoves){
                    shotResult = aiTable.processShot(selectedTargetCell);
                    console.log(shotResult);
                    if(shotResult === 0){
                        return;
                    }
                    else{
                        playerMoves++;
                    }
                }
                generateAIMoveDumb();
                aiMoves++;
                return;
            }
        }
    });

// } TODO: 


// initialize(); TODO:

function buttonPress() {
    submitBoolean = true;
    submitButtonElement.disabled = true;
    verticalRadioElement.disabled = false;
    horizontalRadioElement.disabled = false;
    checkerArray.forEach(function(cell){
        cell.cellElement.innerText = 'A';
    })
    humanTable.setAShip(currentShip, selectedCell);
    shipCounter++;
    if(shipCounter >=5){
        humanTable.fillCellArrays();
        verticalRadioElement.disabled = true;
        horizontalRadioElement.disabled = true;
        updateTextElement(instructionElement, `You have placed all of your ships. Click on the Computer's board to choose a target and start the game!`);
        return;
    }
    currentShip = humanShips[shipCounter];
    message = `You are placing ${currentShip.name}. It has ${currentShip.length} cells. Select the radio option of your desired orientation - horizontal is default. Then click top or left cell of the ship.`;
    updateTextElement(instructionElement, message);
    checkerArray = [];
    return;
}