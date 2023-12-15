document.addEventListener('DOMContentLoaded', function() {
    "use strict";

    window.addEventListener('resize', () => {
        document.querySelector('main').style.height = 
        window.innerHeight -
        document.querySelector('header').scrollHeight
        + "px";
    });
    
    add(0, 1);

    function getUserInput(parentNode) {
        let inputs = parentNode.getElementsByTagName('input');
        let userInput = {};
        if (inputs.length === 1) {
            if (inputs[0].placeholder === "Data")
                userInput.data = inputs[0].valueAsNumber;
            else
                userInput.index = inputs[0].valueAsNumber;
            return userInput;
        }
        userInput.index = inputs[0].valueAsNumber;
        userInput.data = inputs[1].valueAsNumber;
        return userInput;
    }

    // Add Button

    document.getElementById('add-btn').addEventListener('click', function() {
        let userInput = getUserInput(this.parentNode);
        add(nodes.length, userInput.data);
    });

    // Set Button

    document.getElementById('set-btn').addEventListener('click', function() {
        let userInput = getUserInput(this.parentNode);
        set(userInput.index, userInput.data);
    });

    // Insert Button

    document.getElementById('insert-btn').addEventListener('click', function() {
        let userInput = getUserInput(this.parentNode);
        add(userInput.index, userInput.data);
    });

    // Remove Button

    let removeBtn = document.getElementById("remove-btn");
    let inputs = removeBtn.parentNode.parentNode.getElementsByTagName('input');
    let error = document.getElementById('error');

    removeBtn.addEventListener('click', () => {
        let input = null;
        for (let i of inputs)
            if (i.style.display !== "" && i.style.display !== "none") 
                input = i;

        if (input === null) {
            error.innerHTML =
                "<i class='fas fa-exclamation-circle'></i>" +
                "Chọn lựa chọn xoá nút";
            error.firstChild.style.animation =
                "highlightNode .8s ease";
            return;
        }

        if (input.placeholder === "Index")
            removeIndex(input.valueAsNumber);
        else
            removeData(input.valueAsNumber);
    });

    let removeIndexBtn = document.getElementById("remove-index-btn");
    let removeDataBtn = document.getElementById("remove-data-btn");
    let menuAnimationTimeout = 800;

    //Find button
    document.getElementById('find-btn').addEventListener('click', function() {
        let userInput = getUserInput(this.parentNode);
        findRecursively(userInput.data);
    });
    //Traverse button
    document.getElementById('traverse-btn').addEventListener('click', function() {
        traverseRecursively();
    });
    // Stack & Queue

    // enQueue Button
        // enQueue Button
    document.getElementById('enqueue-btn').addEventListener('click', function() {
        let userInput = getUserInput(this.parentNode);
        enQueue(userInput.data);  // Assuming enQueue is the appropriate function for adding to the queue
    });

    // deQueue Button
    document.getElementById('dequeue-btn').addEventListener('click', function() {
        deQueue();  // Assuming deQueue is the appropriate function for removing from the queue
    });

    // push Button
    document.getElementById('push-btn').addEventListener('click', function() {
        let userInput = getUserInput(this.parentNode);
        push(userInput.data);  // Assuming push is the appropriate function for adding to the stack
    });

    // pop Button
    document.getElementById('pop-btn').addEventListener('click', function() {
        pop();  // Assuming pop is the appropriate function for removing from the stack
    });


    function hideButtons() {
        removeIndexBtn.style.display = "none";
        removeDataBtn.style.display = "none";
    }

    document.getElementById('remove-settings').addEventListener('click', function() {
        let displayed =
			removeIndexBtn.style.display !== "" &&
            removeIndexBtn.style.display !== "none";

        if (!displayed) {
            this.firstChild.nextSibling.style.animation = 
                "removeAnimationOn " + 
                menuAnimationTimeout / 1000 + "s " +
                "ease";

            removeIndexBtn.style.display = "block";
            removeIndexBtn.style.animation = 
                "toggleMenuDown " + 
                menuAnimationTimeout / 1000 + "s " +
                "ease";

            removeDataBtn.style.display = "block";
            removeDataBtn.style.animation = 
                "toggleMenuDown200 " + 
                menuAnimationTimeout / 1000 + "s " +
                "ease";

            inputs[0].style.display = "none";
            inputs[1].style.display = "none";
        }
        else {
            this.firstChild.nextSibling.style.animation = 
                "removeAnimationOff " + 
                menuAnimationTimeout / 1000 + "s " +
                "ease";

            removeIndexBtn.style.animation = 
                "toggleMenuUp " + 
                menuAnimationTimeout / 1000 + "s " +
                "ease";

            removeDataBtn.style.animation = 
                "toggleMenuUp200 " + 
                menuAnimationTimeout / 1000 + "s " +
                "ease";

            setTimeout(() => {
                removeIndexBtn.style.display = "none";
                removeDataBtn.style.display = "none";
            }, 800);
        }
    });

    removeIndexBtn.addEventListener('click', () => {
        inputs[0].style.display = "block";
        inputs[1].style.display = "none";
        hideButtons();
    });

    removeDataBtn.addEventListener("click", () => {
		inputs[0].style.display = "none";
        inputs[1].style.display = "block";
        hideButtons();
	});
     
});
