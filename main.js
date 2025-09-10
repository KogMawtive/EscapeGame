    const IH = window.innerHeight;
    const IW = window.innerWidth;

    const wall = document.getElementById("wall");

    wall.style.left = (IW / 2) + "px"
    wall.style.top = (IH / 2) + "px"


    // Fonction drag & drop basique
    const objects = document.querySelectorAll('.object');

    objects.forEach(obj => {
      obj.addEventListener('mousedown', startDrag);
    });

    let current = null;
    let offsetX, offsetY;

    function startDrag(e) {
      current = e.target;
      offsetX = e.clientX - current.offsetLeft;
      offsetY = e.clientY - current.offsetTop;
      document.addEventListener('mousemove', drag);
      document.addEventListener('mouseup', stopDrag);
    }

    function drag(e) {
      if (!current) return;
      current.style.left = (e.clientX - offsetX) + 'px';
      current.style.top = (e.clientY - offsetY) + 'px';
    }

    function stopDrag() {
      document.removeEventListener('mousemove', drag);
      document.removeEventListener('mouseup', stopDrag);
      current = null;
    }
