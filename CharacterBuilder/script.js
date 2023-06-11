var selectedTags = [];
var negativeTags = [];
var isUnderscore = true;
var isShowNsfw = false;

// Scroll to top
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function updateSliderValue(value) {
    document.getElementById("slider_value").innerText = "" + value;
}

// Updates selected and negative tags display
function updateTags() {
    if (selectedTags.length === 0) {
        document.getElementById("selected-tags").innerText = "none";
    }
    else {
        var text = selectedTags.join(", ");
        document.getElementById("selected-tags").innerText = isUnderscore ? text : text.replace(/_/g, " ");
    }

    if (negativeTags.length === 0) {
        document.getElementById("negative-tags").innerText = "none";
    }
    else {
        var text = negativeTags.join(", ");
        document.getElementById("negative-tags").innerText = isUnderscore ? text : text.replace(/_/g, " ");
    }
}

// Updates if nsfw tags should be shown
function updateChoices() {
    document.querySelectorAll(".nsfw").forEach(el => el.style.display = isShowNsfw ? "initial" : "none");
}

// Intermediary function to update the boolean for isUnderscore
function removeUnderscores(checked) {
    isUnderscore = !checked;
    updateTags();
}

// Intermediary function to update the boolean for isShowNsfw
function showNSFW(checked) {
    isShowNsfw = checked;
    updateChoices();
}

// Resets tag states
function resetAll() {
    document.querySelectorAll("div > input[type=checkbox]").forEach(el => { el.indeterminate = true; el.readOnly = true; });

    selectedTags = [];
    negativeTags = [];

    document.getElementById("selected-tags").innerText = "none";
    document.getElementById("negative-tags").innerText = "none";
}

// Updates the selected and negative tags arrays (& display) when a checkbox state changes
function tagchanged(obj) {
    if (obj.readOnly) obj.checked = !(obj.readOnly = false);
    else if (obj.checked) obj.readOnly = obj.indeterminate = true;

    if (obj.checked && !obj.indeterminate) {
        selectedTags.push(obj.value);
        negativeTags = negativeTags.filter(item => item !== obj.value);
    }
    else if (obj.indeterminate) {
        selectedTags = selectedTags.filter(item => item !== obj.value);
        negativeTags = negativeTags.filter(item => item !== obj.value);
    } else if (!obj.checked && !obj.indeterminate) {
        selectedTags = selectedTags.filter(item => item !== obj.value);
        negativeTags.push(obj.value);
    }

    selectedTags.sort();
    negativeTags.sort();

    updateTags();
}

// Gets a random integer from [0 - max)
function randomInt(max) {
    return Math.floor(Math.random() * max);
}

// Randomizes the tag states
function randomize() {
    resetAll();

    document.querySelectorAll("div.box>div").forEach(el => {
        if (randomInt(100) + 1 <= document.getElementById("tag_amount_weightage").value) {
            const inputs = el.querySelectorAll("input");
            var index = randomInt(inputs.length); // random tag from category
            inputs[index].click();
        }
    });
}

// Call when script is loaded
resetAll();
updateChoices();
