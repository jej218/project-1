// CONST DECLARATION

    // Arrau of Ship Values as object
        // Name - string
        // Size - Number

    // Array of Cell Name Values as object
        // Name ex. C4 - string
        // Number

    // (REACH GOAL): Images for ships
        // (I will work on this after the main pseudocode if I think it's a reasonable goal)


// CREATE CLASSES


    // Ship Class - represents an individual ship and its status vis a vis the game
        // Constructor
            // Parameters
                // Ship Value object
                // Table object
                // isHuman 
            // Variables
                // Name - string from Ship Value
                // Size - number from Ship Value
                // isSunk - boolean set as false
                // isVertical - boolean set as false
                // Ship condition (hit or not) - array of booleans length equal to size and set as false
                    // set .length
                    // .fill(false)
                // locations - Array (length equal to size) of Cell objects, all values set as null

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
                        // call ships sunk function for each cell object in locations
                    // return isSunk

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
                //



// Cache HTML Elements

    // Humans board
    // Players board

    // Instruction panel

    // 'Admin' Panel
        // Error display
        // radio inputs for horizontal or vertical (these are grouped)
        // confirm button



// non class functions
    // place ai ships
        // arguments
            // takes array of ship objects
            // takes table object
        // sets the value of the ai's ships cells
        // assigns ship objects to ai table object

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

// main event listeners
    // cells
        // if human table ships have not yet been placed (check human table object ship object array)
            // if cell is in human table
                // 

// Event listener helper functions
    // Human Choose ships
        // parameters 
            // array of ships for human (this is the new fresh array after being constructed)

            // goes through each ship
                // updates text in instructions 
                    // You are placing ship name - 
                    // it has size cells - 
                    // select radio option of your desired orientation (Horizontal is default)
                    // Then click top or left cell of ship

                // sets both radio options to active
                // sets horizontal to selected

                // Adds event listener to all cells on human board
                    // if vertical is selected
                        // calls ship class method to set vertical as true
                    // sets location placeholder double array to be empty
                    // checks if first cell is occupied
                        // if target cell is in the placeholder array
                            // updates text to describe error
                            // leaves event
                    //checks if remainder fits
                        // if horizontal
                            // for loop # of iterations is the size of this ship object (excluding first cell so -1)
                                // each iteration calculate using iterator the new cell location

                // click new cell to place ship somewhere else
                // click confirm button to finalize placement


                // sets button (confirm button) to true
