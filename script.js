let isStartMenuOpen = false;
let windows = {};
let taskbarIcons = document.getElementById('taskbarIcons');

document.addEventListener("DOMContentLoaded", () => {
    // Store windows in an object for easy reference
    windows.window1 = document.getElementById('window1');
    windows.window2 = document.getElementById('window2');
    windows.startMenu = document.getElementById('startMenu');
    windows.taskbarIcons = taskbarIcons;
});

// Toggle the visibility of the Start Menu
function toggleStartMenu() {
    isStartMenuOpen = !isStartMenuOpen;
    windows.startMenu.style.display = isStartMenuOpen ? 'block' : 'none';
}

// Open a specific window
function openWindow(windowId) {
    const window = windows[windowId];
    if (window) {
        window.style.display = 'block';
        addTaskbarButton(windowId);
        bringToFront(window);
    }
    closeStartMenu();
}

// Close a specific window
function closeWindow(windowId) {
    const window = windows[windowId];
    if (window) {
        window.style.display = 'none';
    }
    removeTaskbarButton(windowId);
}

// Minimize a window
function minimizeWindow(windowId) {
    const window = windows[windowId];
    if (window) {
        window.classList.add('minimized');
    }
}

// Maximize a window
function maximizeWindow(windowId) {
    const window = windows[windowId];
    if (window) {
        window.classList.toggle('maximized');
    }
    bringToFront(window);
}

// Bring a window to the front (active window)
function bringToFront(window) {
    Object.values(windows).forEach(win => {
        if (win.style.display === 'block') {
            win.style.zIndex = 1;
        }
    });
    window.style.zIndex = 999;
}

// Taskbar Button Creation
function addTaskbarButton(windowId) {
    let button = document.createElement('button');
    button.innerText = windowId.replace('window', 'App ');
    button.onclick = () => openWindow(windowId);
    taskbarIcons.appendChild(button);
}

// Remove Taskbar Button
function removeTaskbarButton(windowId) {
    let buttons = taskbarIcons.querySelectorAll('button');
    buttons.forEach(button => {
        if (button.innerText === windowId.replace('window', 'App ')) {
            button.remove();
        }
    });
}

// Make window draggable
function enableWindowDrag(window) {
    const header = window.querySelector('.window-header');
    
    header.addEventListener('mousedown', (e) => {
        const offsetX = e.clientX - window.getBoundingClientRect().left;
        const offsetY = e.clientY - window.getBoundingClientRect().top;
        
        function onMouseMove(moveEvent) {
            window.style.left = moveEvent.clientX - offsetX + 'px';
            window.style.top = moveEvent.clientY - offsetY + 'px';
        }

        document.addEventListener('mousemove', onMouseMove);

        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', onMouseMove);
        }, { once: true });
    });
}

// Enable dragging for all windows
Object.values(windows).forEach((win) => {
    if (win !== windows.startMenu) {
        enableWindowDrag(win);
    }
});
