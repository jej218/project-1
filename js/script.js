// CONST DECLARATION

    // Ship Values as object
        // Name - string
        // Size - Number

    // Cell Name Values as object
        // Name ex. C4 - string
        // Number

    // (REACH GOAL): Images for ships
        // (I will work on this after the main pseudocode if I think it's a reasonable goal)


// CREATE CLASSES

    // Ship Class - represents an individual ship and its status vis a vis the game
        // Constructor
            // Parameters
                // Ship Value object
            // Variables
                // Name - string from Ship Value
                // Size - number from Ship Value
                // isSunk - boolean set as false
                // isVertical - boolean set as false
                // Ship condition (hit or not) - array of booleans length equal to size and set as false
                    // set .length
                    // .fill(false)
                // locations - Array (length equal to size) of Cell objects, all values set as null
                // Table object - boolean set as null
                // isHuman - i might not need this if i work on encapsulation
                // NOTE: I think if i put most of my logic in the table class i only need an isHuman variable there
                // NOTE: this also applies to the table object. i don't need to access ship.table if more logic is encapsulated in the table class itself

            // Methods
                // Place ship - sets up locations array for this ship for the game and the visual representation of this ship
                    // Parameters are coordinates of the left or top cell as numbers and the table object 
                    // logic for isVertical and size
                    // After locations is set up calls on the place ship method for each cell object within
                        // passes as argument this ship Object

                // setVertical()
                     // makes Ship Vertical               

                // hit(Cell) - processes a hit of the ship at the given coordinates - handed to the ship object through method in Table class
                    // sets the value of condition array that is in the corresponding location in the locations array as the Cell passed as a parameter to be true
                    // i.e. updates the condition array
                    // calls hit function to cell object
                    // if all condition values are now true
                        // set isSunk to be true
                        // return true
                    // else
                        // return false
                      
                
    // Table Class
        // Constructor 
            // Parameters
                // 10x10 2 dimensional array of Cell objects
                // isHuman boolean
                // Array of 5 ship objects for that tables ship (in same order as constant)
            // Other class Variables
                // 2D Arrays of Coordinates of:
                    // cells with a ship that is 'healthy' - initialize via the array of ship objects
                    // cells with a ship that has been hit - initialize to be null
                    // cells that are empty (with no ship and have not yet been shot at) - initialize in same loop that initializes healthy ship array
                    // cells that are misses (no ship and have been shot at) - initialize to be null
                // NOTE: these values could come from the 10x10 2d array of cell objects, but make it simpler to search a table for specific things

        // Methods
            // Returns coords of cell object passed as parameter
            // Returns cell object of given coord 
            // Returns its ship object of given ship name - string parameter
            // Method to process a shot from the opponent
                // Parameters
                    // coords of cell as 2 numbers
                // if coords match with a cell that has been hit or missed before
                    // returns null and exits function
                // if the coords match with a cell that is empty
                    // pop coords from empty coords array
                    // push coords to missed coords array
                    // call miss method of cell object at coords
                    // return false and exits function
                // if the coords match with a cell that is 'healthy'
                    // pop coords from healthy coords array
                    // push coords to hit coords array
                    // find ship object that was hit from array of ship objects
                    // call hit function on ship object that was hit
                        // NOTE: this will also call the hit function on the cell
                    // if ships hit function returns true
                        // call on non-class method to display the sunk ship on the ship status part of the HTML
                        // this will probably need isHuman and the Ship object as args
                    // return true and exit function
                    

    // Cell Class
        // Constructor
            // Parameters
                // coords of cell
                // object that points to the HTML element of this cell
                // NOTE: I may end up finding it best to create these Cells (and the HTML elements along with them) in the Table class and then the table class in the initialize function
                // NOTE: This would probably mean i would need to have a variable pointing to an HTML element for each table
                // isHuman - i might not need this if i work on encapsulation
                // NOTE: I think if i put most of my logic in the table class i only need an isHuman variable there
                // NOTE: Though it might be better to keep isHuman in the Cell class to handle different code when displaying the AI's board
                // NOTE: Ultimately it will likely depend on my implementation of the initialize function - I will revisit this after that is complete   
            // Other class variables
                // type - string representation of type of ship - set to ''
            // Also in the constructor:
                // if cell is on humans board
                    // add a class of water to HTML element for css reasons
                // 

        // Methods
            // placeShip(ship) - Method to process adding a ship to this cell
                // sets type of this cell to ship.name
                // if this cell is on the humans board
                    // add healthy-ship class to HTML element
                        // CSS will be set up change the style of the element to display a ship
                        // i.e. background color, border
                    
            // Hit - Method to process this cell being hit
            // Miss - Method to process this cell being missed

// Cache HTML Elements



