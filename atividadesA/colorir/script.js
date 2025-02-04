const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const colorPicker = document.getElementById('colorPicker');
        const uploadBtn = document.getElementById('uploadBtn');
        const imageInput = document.getElementById('imageInput');
        const clearBtn = document.getElementById('clear');
        const saveBtn = document.getElementById('save');
        const colorOptions = document.querySelectorAll('.color-option');
        const toleranceInput = document.getElementById('tolerance');
        const toleranceValue = document.getElementById('toleranceValue');

        let currentColor = '#000000';
        let originalImageData = null;
        let undoStack = [];
        const maxUndoSteps = 50;

        // Configurar tamanho do canvas
        function resizeCanvas() {
            canvas.width = canvas.parentElement.clientWidth;
            canvas.height = window.innerHeight * 0.6;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Carregar imagem
       /* uploadBtn.addEventListener('click', () => imageInput.click());
        imageInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const img = new Image();
                    img.onload = function() {
                        canvas.width = img.width;
                        canvas.height = img.height;
                        ctx.drawImage(img, 0, 0);
                        originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    };
                    img.src = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        });*/


        // Save current state for undo
        function saveState() {
            undoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
            if (undoStack.length > maxUndoSteps) {
                undoStack.shift();
            }
            undoBtn.disabled = false;
        }

        // Undo last action
        function undo() {
            if (undoStack.length > 0) {
                const previousState = undoStack.pop();
                ctx.putImageData(previousState, 0, 0);
                if (undoStack.length === 0) {
                    undoBtn.disabled = true;
                }
            }
        }

        // Load the default image when the page loads
        window.addEventListener('load', function() {
            const img = new Image();
            img.onload = function() {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                saveState();
            };
           img.src = 'B.png'; // Replace with your image path
        });


        // Função de preenchimento (flood fill)
        function floodFill(startX, startY, fillColor) {
           
            saveState();
           
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const pixels = imageData.data;
            
            const startPos = (startY * canvas.width + startX) * 4;
            const startR = pixels[startPos];
            const startG = pixels[startPos + 1];
            const startB = pixels[startPos + 2];
            const startA = pixels[startPos + 3];

            const tolerance = parseInt(toleranceInput.value);

            if (startR === undefined) return;

            const fillR = parseInt(fillColor.slice(1, 3), 16);
            const fillG = parseInt(fillColor.slice(3, 5), 16);
            const fillB = parseInt(fillColor.slice(5, 7), 16);

            const stack = [[startX, startY]];
            
            function matchesStartColor(pos) {
                return Math.abs(pixels[pos] - startR) <= tolerance &&
                       Math.abs(pixels[pos + 1] - startG) <= tolerance &&
                       Math.abs(pixels[pos + 2] - startB) <= tolerance &&
                       Math.abs(pixels[pos + 3] - startA) <= tolerance;
            }

            function setFillColor(pos) {
                pixels[pos] = fillR;
                pixels[pos + 1] = fillG;
                pixels[pos + 2] = fillB;
                pixels[pos + 3] = 255;
            }

            while (stack.length) {
                const [x, y] = stack.pop();
                const pos = (y * canvas.width + x) * 4;

                if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height || !matchesStartColor(pos))
                    continue;

                setFillColor(pos);

                stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
            }

            ctx.putImageData(imageData, 0, 0);
        }

        // Eventos do mouse
        canvas.addEventListener('click', function(e) {
            const rect = canvas.getBoundingClientRect();
            const x = Math.floor((e.clientX - rect.left) * (canvas.width / rect.width));
            const y = Math.floor((e.clientY - rect.top) * (canvas.height / rect.height));
            floodFill(x, y, currentColor);
        });

        // Eventos dos controles
        colorPicker.addEventListener('change', (e) => {
            currentColor = e.target.value;
            updateActiveColor(e.target.value);
        });

        clearBtn.addEventListener('click', () => {
            if (originalImageData && confirm('Tem certeza que deseja limpar todas as cores?')) {
                ctx.putImageData(originalImageData, 0, 0);
            }
        });

        saveBtn.addEventListener('click', () => {
            const link = document.createElement('a');
            link.download = 'meu-desenho-colorido.png';
            link.href = canvas.toDataURL();
            link.click();
        });

        undoBtn.addEventListener('click', undo);

        toleranceInput.addEventListener('input', (e) => {
            toleranceValue.textContent = e.target.value;
        });

        // Paleta de cores
        colorOptions.forEach(color => {
            color.addEventListener('click', () => {
                const bgColor = window.getComputedStyle(color).backgroundColor;
                currentColor = rgbToHex(bgColor);
                colorPicker.value = currentColor;
                updateActiveColor(currentColor);
            });
        });

        function updateActiveColor(color) {
            colorOptions.forEach(option => {
                option.classList.remove('active');
                if (rgbToHex(window.getComputedStyle(option).backgroundColor) === color) {
                    option.classList.add('active');
                }
            });
        }

        function rgbToHex(rgb) {
            const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            if (!match) return rgb;
            const r = parseInt(match[1]);
            const g = parseInt(match[2]);
            const b = parseInt(match[3]);
            return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        }