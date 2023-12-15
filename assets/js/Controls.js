
class Controls {
    // Using the static keyword to define readable class constants

    // Constants for the ids of various user interface elements
    static CLEARID = "clear-btn";
    static QUICKFILLID = "quick-fill-btn";
    static SLOWFILLID = "slow-fill-btn";
    static ADDID = "add-btn";
    static SEARCHID = "search-btn";
    static SLIDERID = "speed-slider";

    // The number of nodes above which the user will be warned before running
    // "Fill" or "Quick Fill"
    static NODELIMIT = 500;

    constructor(tree) {
        this.tree = tree;
        this.tree.bindControls(this);  // Provide the tree a reference to this class

        this.animationInterval = null; // Property Tree class relies on for animation

        // Store all of the user interface elements based on the IDs
        this.clearBtn = document.getElementById(Controls.CLEARID);
        this.quickFillBtn = document.getElementById(Controls.QUICKFILLID);
        this.slowFillBtn = document.getElementById(Controls.SLOWFILLID);
        this.addBtn = document.getElementById(Controls.ADDID);
        this.searchBtn = document.getElementById(Controls.SEARCHID);
        this.speedSlider = document.getElementById(Controls.SLIDERID);

        // Set the animation interval based on the slider's value
        this.setAnimationSpeed();

        // Append event listeners to run each animation
        this.clearBtn.addEventListener('click',
            () => this.triggerAnimation(this.clear));
        this.quickFillBtn.addEventListener('click',
            () => this.triggerAnimation(this.quickFill));
        this.slowFillBtn.addEventListener('click',
            () => this.triggerAnimation(this.slowFill));
        this.addBtn.addEventListener('click',
            () => this.triggerAnimation(this.add));
        this.searchBtn.addEventListener('click',
            () => this.triggerAnimation(this.search));

        // Append an event listener to change the animation interval
        this.speedSlider.addEventListener('input', this.setAnimationSpeed.bind(this));
    }

    // Completly resets the tree, removing all nodes, stopping all animations
    clear() {
        this.tree.clear();
        this.tree.stopAnimation(() => {})
        this.tree.draw();
    }

    // Called by event listeners to run a certain animation if one is not running
    triggerAnimation(animation) {
        if(this.tree.running) {
            alert('Vui lòng đợi cho thuật toán hoàn thành');
        } else {
            // Bind the animation here so it doesn't have to be bound as an argument
            animation.bind(this)();
        }
    }

    // Prompts the user with a given piece of text
    // Returns: null               => if no valid number was entered
    //          postive integer    => if a valid positive integer is provided
    getNumber(text) {
        var value = prompt(text);

        if(value === null) {
            return null;
        } else if(isNaN(parseInt(value)) || value === "" || parseInt(value) < 0) {
            alert('Nhập số dương');
            return null;
        } else {
            return parseInt(value);
        }
    }

    // Method for the Quick Fill animation
    quickFill() {
        var count = this.getNumber("Nhập số lương node: ");

        if(count !== null && (count < Controls.NODELIMIT ||
                confirm(count + ' node có thể mất thời gian. Chọn OK để tiếp tục thực hiện'))) {
            this.tree.fill(count);
        }
    }

    // Method for the Fill animation
    slowFill() {
        var count = this.getNumber("Số lượng node: ");

        if(count !== null && (count < Controls.NODELIMIT ||
                confirm(count + ' node có thể mất thời gian. Chọn OK để tiếp tục thực hiện'))) {
            this.tree.fillVisual(count);
        }
    }

    // Method for the Add animation
    add() {
        var value = this.getNumber("Nhập số để thêm vào cây : ");

        if(value !== null && this.tree.search(value)) {
            alert(value + 'đã có ở trong cậy');
        } else if(value !== null){
            this.tree.addValueVisual(value);
        }
    }

    // Method for the search animation
    search() {
        var value = this.getNumber("Nhập số để tìm: ");

        if(value !== null) {
            this.tree.searchVisual(value)
        }
    }

    // Inverts and exponentiates the linear output of the slider to set the interval
    setAnimationSpeed() {
        this.animationInterval= 1000/Math.pow(10, this.speedSlider.value);
    }
}
