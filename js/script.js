
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
        console.log(placeHolderCell);
        placeHolderRow.push(placeHolderCell);
    });
    CELLNAMEVALUES.push(placeHolderRow);
});

class Ship { // Ship Class - represents an individual ship and its status vis a vis the game
    constructor(shipValue, table, isHuman){
        this.shipValue = shipValue; // from SHIPVALUES
        this.table = table; // matching table object
        this.isHuman = isHuman; // does this belong to the human player
        this.name = shipValue.name;  // string name of the ship (for display)
        this.length = shipValue.length; // number of cells in the ship
        this.isSunk = false; // if the ship has been sunk
        this.isVertical = false; // if the ship is vertical
    }
    // Variables
        // Name - string from Ship Value
        // Size - number from Ship Value
        // isSunk - boolean set as false
        // isVertical - boolean set as false
        // Ship condition (hit or not) - array of booleans length equal to size and set as false
            // set .length
            // .fill(false)
        // locations - Array (length equal to size) of Cell objects, set as empty

    // Methods
        // Place ship - sets up locations array for this ship for the game and the visual representation of this ship
            // Parameter is cell object of top or left cell
            // logic for isVertical and size
            // After locations is set up calls on the place ship method for each cell object within
                // passes as argument name

        // setVerticalTo(boolean)
                // makes Ship Verticality equal boolean               

        // hit(Cell) - processes a hit of the ship at the given coordinates - handed to the ship object through method in Table class
            // sets the value of condition array that is in the corresponding location in the locations array as the Cell passed as a parameter to be true
            // i.e. updates the condition array
            // call hit function for cell
            // if all condition values are now true
                // set isSunk to be true
                // call cells sunk function for each cell object in locations
            // return isSunk
}

// Table Class
// Constructor 
    // Parameters
        // isHuman boolean
        // HTML Element that contains the Table 
    // Other class Variables
        // Array of 5 ship objects for that tables ship (in same order as constant) - set as empty to start
        // 10x10 2 dimensional array of Cell objects
            // Cell Objects
                // Created within the table class constructor
                // HTML element created for each cell
                // Adds an Id to that element representing the alphanumerical code for the cell (C3 ex)
                // passes table class variables to Cell class constructor 
                    // HTML element for the cell
                    // coords from for loop
                    // isHuman boolean
                    // Cell Value (name) object, working through that global array with the same reference
                // pushes each cell object to the Array (keeping 2 by 2 format)
        // Arrays of Cells of:
            // cells with a ship that is 'healthy' - initialize to be empty
            // cells with a ship that has been hit - initialize to be empty
            // cells that are empty (with no ship and have not yet been shot at) - initialize to be empty
            // cells that are misses (no ship and have been shot at) - initialize to be empty
                        
// Methods
    // sets array of ship objects
        // takes array of ship objects as parameter
        // this adds the array of ship objects after the locations are generated for the ai 
        // or chosen by the player

    // Populating Cell data arrays
            // cells with a ship that is 'healthy' - set via the array of ship objects 
            // cells with a ship that has been hit - stays as empty no code needed
            // cells that are empty (with no ship and have not yet been shot at) - set in same loop that sets healthy ship array
            // cells that are misses (no ship and have been shot at) - stays as empty no code needed

    // Returns coords of cell object passed as parameter - using 10x10 array
    // Returns cell object of given coord - using 10x10 array
    // Returns its ship object of given ship name - string parameter

    // Method to process a shot from the opponent
    // Uses the arrays of cells to check
        // Parameters
            // Cell object
        // if cell has been hit or missed before
            // returns null and exits function
        // if cell is empty
            // pop Cell from empty Cell array
            // push coCellrds to missed Cell array
            // call miss method of cell object
            // return false and exits function
        // if cell is 'healthy'
            // pop Cell from healthy Cell array
            // push Cell to hit Cell array
            // find ship object that was hit from array of ship objects
            // call hit function on ship object that was hit
                // NOTE: this will also call the hit function on the cell
            // if ships hit function returns true
                // call on non-class method to display the sunk ship on the ship status part of the HTML
                // this will probably need isHuman and the Ship object as args
            // return true and exit function

// Cell Class
// Constructor - note that this constructor is only called in the table class constructor
    // Parameters
        // coords of cell (from counters in for loops)
        // object that points to the HTML element of this cell - elements made in the for loops in table constructor
        // isHuman - passed from same variable in table class
        // cellName object (this is a global static variable) - passed from for loops

    // Other class variables
        // type - string representation of type of ship - set to ''
    // Also in the constructor:
        // if cell is on humans board
            // add a class of water to HTML element for css reasons
        // if cell is on the ais board
            // add a class of fog of war to HTML element for css reasons

// Methods
    // placeShip(ship) - Method to process adding a ship to this cell
        // sets type of this cell to ship.name 
        // if this cell is on the humans board
            // add healthy-ship class to HTML element
                // CSS will be set up change the style of the element to display a ship
                // i.e. background color, border
            // set HTML elements text to type

            
    // Hit - Method to process this cell being hit
        // if this cell is on the humans board
            // remove healthy-ship class from HTML element
            // add hit-ship class to HTML element
        // if cell is on ais board
            // add hit-ai-ship class to HTML element
            // sets HTML elements text to ????

    // Miss - Method to process this cell being missed
        // if this cell is on the humans board
            // remove water class from html
        // if cell is on ais board
            // remove fog of war class from html
        // add miss class to html

    // sunk - method to process this cell when its ship has been sunk
        // if cell is human
            // remove hit-ship class
        // if cell is Ai
            // sets elements text to type
            // remove hit-ai-ship class
        // adds sunk-ship class



// Cache HTML Elements

    // Humans board
    // Players board

    // Instruction panel

    // 'Admin' Panel
        // Error display
        // radio inputs for horizontal or vertical (these are grouped)



// non class functions
    // place ai ships
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

    // update text element
        // takes html element
        // takes string
        // displays string as text in said element

    // set input
        // takes input element
        // takes boolean
        // clears prior value of input
        // sets active status to boolean value




// Initialize
    // Set starting values to what they should be 


    // Construct table objects
        // Human board
            // isHuman true
            // HTML element

        // AI board
            // isHuman false
            // HTML element

    // at this point the tables and cells exist on the DOM and are displaying blank as the start of the game

    // Construct Ship objects
        // create empty array for human and one for ai
        // forEach through ship constant global array
            // Construct ships
                // Human shipX
                    // Ship object
                    // isHuman true
                    // human board
                // Ai shipx
                    // ship Object
                    // isHuman false
                    // ai board
            // push each new ship object to corresponding array

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

