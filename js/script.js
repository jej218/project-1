
// Array of Ship Values as object
const SHIPVALUES = [{name: 'Aircraft Carrier', length: 5}, {name: 'Battleship', length: 4}, {name: 'Submarine', length: 3}, {name: 'Cruiser', length: 3}, {name: 'Destroyer', length: 2}];

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

// Double Array of Cell info as objects - one value name from CELLNAMES - one value x coord - one value y coord
// This was done to avoid typing out all of the values for each 100 objects
const CELLNAMEVALUES = [];
CELLNAMES.forEach(function(row, i){
    let placeHolderRow = [];
    row.forEach(function(cell, j){
        let placeHolderCell = {};
        placeHolderCell.name = cell;
        placeHolderCell.x = j;
        placeHolderCell.y = i;
        placeHolderRow.push(placeHolderCell);
    });
    CELLNAMEVALUES.push(placeHolderRow);
});

// Cache HTML Elements
let humanTableElement = document.querySelector('#human-table');
let aiTableElement = document.querySelector('#ai-table');

    // Instruction panel

    // 'Admin' Panel
        // Error display
        // radio inputs for horizontal or vertical (these are grouped)




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
                holderCell = returnCellRelative(this.table, firstCell, firstCell.cellNameValue.x, i); // sets the cell variable along the y axis
            }
            else{
                holderCell = returnCellRelative(this.table, firstCell, i, firstCell.cellNameValue.y); // sets the cell variable along the x axis
            }
            this.locations.push(holderCell); // pushes to locations array
            holderCell.placeShip(this.name); // calls the cells placeShip method with this ships name as argument
        }
    }
     
    setVerticalTo(isVerticle){ // simple setter method for the ships isVertical variable
        this.isVertical = isVerticle;
    }

    hit(cell){  // function to hand a cell on this ship getting hit. It is passed from this ship's table
        // the parameter is the cell that was hit
        this.conditions[this.locations.findIndex(location => location === cell)] = true; // this sets the value of the conditions array that matches with 
        // the hit cell to be true
        cell.hit();  // this calls the cells hit function
        if(this.conditions.every(condition)){ // if all values in conditions are true (all cells are hit)
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
        CELLNAMEVALUES.forEach(function(row, i){ // parse through CELLNAMEVALUES for proper 10x10 format and data availability
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

    setShips(ships){ // simple setter method for the ships array
        this.ships = ships;
    }

    fillCellArrays(){ // fills up the arrays of cells after ships array has been set
        this.ships.forEach(function(ship){
            ship.locations.forEach(function(location){
                this.healthyShipCells.push(location); // adds each cell of each ship to the array
            });
        });
        this.cells.forEach(function(row){
            row.forEach(function(cell){
                if(!(this.healthyShipCells.includes(cell))){
                    this.emptyCells.push(cell); // looks through all cells in all the rows in the table and adds cell to array if its not a ship
                }
            });
        });
    }

    // this might be redundant with tableObject.cells[x][y]
    // i finished it so im going to keep it for now
    returnCell(x, y){ // returns the cell object given the coordinates of the cell
        let cellToReturn;
        this.cells.forEach(function(row){ // looks through each row
            cellToReturn = row.find(function(cell){ 
                return cell.cellNameValue.x === x && cell.cellNameValue.y === y; // finds cell that has the same coordinates
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
        if(this.hitShipCells.includes(cell) || this.missedShipCells.includes(cell)){
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
            this.cellElement.classList.add('water'); // TODO: sets the initial style of a humans cell to be empty water
        }
        else{
            this.cellElement.classList.add('fog-of-war'); // TODO: sets the intial style of an AIs cell to be fog-of-war
        }
    }

    placeShip(name){ // this method handles placing a ship in this cell
        // it is called by the ship object being placed, which passes its name as a parameter
        this.type = name;
        if(this.isHuman){
            this.cellElement.classList.remove('water'); // changes style from empty water to a healthy ship if on players board
            this.cellElement.classList.add('healthy-ship'); // TODO:
            this.cellElement.textContent = type.slice(0,1); // also adds text of ship type on player board
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
    // place ai ships TODO:
        // arguments
            // takes array of ship objects
            // takes table object
        // sets the value of the ai's ships cells
            // does this by calling placeShip method of each ship object
                // this takes the cell object of the top or left cell
                // setVerticalTo is called if needed
                // this method also handles the drawing of the cells (not needed for AI's table but stores ship names)
        // assigns ship objects to ai table object
        // calls ai table object method to populate cell data arrays

    // update text element TODO:
        // takes html element
        // takes string
        // displays string as text in said element

    // set input TODO:
        // takes input element
        // takes boolean
        // clears prior value of input
        // sets active status to boolean value

    // returnCellRelative TODO:
        // takes table
        // takes cell
        // takes relative x
        // takes relative y

        // returns cell object in table relative to original cell by whatever x and y translations

    function returnCellRelative(table, cell, relX, relY){
        let initX = cell.xCoord;
        let initY = cell.yCoord;
        return table.cellGrid[initX + relX][initY + relY];
    }

// Initialize
 
    // Set starting values to what they should be  TODO:

function initialize(){

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

    // call choose ai ship location function
        // parameters
            // ai table
            // ai ship object array 


    // at this point the ai ship object array has been filled, and the ai table object and its constituent cell objects and ship objects are ready for the game
    // now the player must place their ships

    // initialize interim array of cell objects as empty where a ship has been placed on the human board (to check for any doubles)
    // for each ship in array of human ship objects
        // call updatetext method for instructions
            // You are placing ship name - 
            // it has size cells - 
            // select radio option of your desired orientation (Horizontal is default)
            // Then click top or left cell of ship
        // set radio options to active with method
        // set horizontal radio to active

        // this sets up the instructions and the initial input element interactions - next to the eventListener for cell click
        // while this ship objects location array is empty - while this ship in the loop does not yet have a location
        // this loop must provide the option for the player to exit or it is infinite - later on add reset button exit option here
            // reset this ships loction array to empty
            // call ships setVerticalTo method with radio input as arguments
            // add event onclick listener to human table
                // find object representing the cell that was clicked via currentTarget and Table object cell lookup
                // intialize checkerArray as empty - this holds each cell that passes the forloop but is redeclared empty at the 
                // beginning of each
                // for loop - iterations equal to length of this ship - iterating through the cells in this potential selection
                    // initialize two numbers to represent the coords of the cell to check
                    // if horizontal
                        // set coords one way
                    // else if horizontal
                        // set coords other way

                    // if this cell does not exist (using iterator and 2d array coords to generate location of additional cells)
                        // updatetext for warning with 'One of the cells in your selection would be off the board!'
                        // return
                    // else if this cell matches with any in the interim array
                        // updatetext for warning with 'One of the cells in your selection would overlap another ship'
                        // return
                    // add cell object to checker array
                // Making it to this point means the cell clicked in combo with the orientation is valid - in the future look to include a submission button
                // updatetext for warning with ''
                // use iterator method to set correct cells to the Ship object
                    // checkerArray has the correct cells in order until event ends
                    // also make sure to call the ship objects placeShip method to draw the cells
                // end of event
            // ships location array should now have a value - ending while loop
        // add each cell in ship object to interim array for interim storage of all used cells
        // add ship to human table object array of ship objects
    // updatetext method for instructions as blank
    // clear radio values
    // set radio values as not active
    // call method to populate human table arrays

}


initialize();
