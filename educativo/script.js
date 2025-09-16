 let selectedImage = null;
        let selectedName = null;
        let score = 0;
        let matches = 0;
        let gameItems = ['gato', 'casa', 'arvore', 'sol', 'flor', 'carro', 'livro', 'bola', 'coracao', 'estrela'];
        let matchedItems = new Set();

        function initGame() {
            shuffleItems();
            shuffleImages();
            updateDisplay();
            showMessage('Selecione uma imagem e depois seu nome correspondente!', '');
        }

        function shuffleItems() {
            // Embaralha a ordem dos nomes
            const namesList = document.getElementById('namesList');
            const names = Array.from(namesList.children);
            
            // Fisher-Yates shuffle
            for (let i = names.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                namesList.appendChild(names[j]);
                names.splice(j, 1);
            }
        }

        function shuffleImages() {
            // Embaralha a ordem das imagens
            const imagesGrid = document.getElementById('imagesGrid');
            const images = Array.from(imagesGrid.children);
            
            // Fisher-Yates shuffle
            for (let i = images.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                imagesGrid.appendChild(images[j]);
                images.splice(j, 1);
            }
        }

        function selectImage(element) {
            if (matchedItems.has(element.dataset.item)) return;
            
            // Remove seleção anterior
            document.querySelectorAll('.image-card.selected').forEach(card => {
                card.classList.remove('selected');
            });
            
            // Seleciona nova imagem
            element.classList.add('selected');
            selectedImage = element.dataset.item;
            
            // Adiciona efeito visual
            element.classList.add('pulse');
            setTimeout(() => element.classList.remove('pulse'), 1500);
            
            showMessage('Imagem selecionada! Agora clique no nome correspondente.', '');
        }

        function selectName(element) {
            if (matchedItems.has(element.dataset.item)) return;
            
            // Remove seleção anterior
            document.querySelectorAll('.name-card.selected').forEach(card => {
                card.classList.remove('selected');
            });
            
            // Seleciona novo nome
            element.classList.add('selected');
            selectedName = element.dataset.item;
            
            if (selectedImage && selectedName) {
                checkMatch();
            } else {
                showMessage('Selecione primeiro uma imagem!', 'error');
            }
        }

        function checkMatch() {
            if (selectedImage === selectedName) {
                // Acerto!
                score += 10;
                matches++;
                matchedItems.add(selectedImage);
                
                // Marca como correto
                const imageElement = document.querySelector(`[data-item="${selectedImage}"]`);
                const nameElement = document.querySelector(`[data-item="${selectedName}"]`);
                
                imageElement.classList.add('correct');
                nameElement.classList.add('matched');
                
                showMessage('🎉 Parabéns! Você acertou!', 'success');
                
                // Verifica se o jogo terminou
                if (matches === gameItems.length) {
                    setTimeout(() => {
                        showCompletionMessage();
                    }, 1000);
                }
            } else {
                // Erro!
                score = Math.max(0, score - 5);
                showMessage('❌ Ops! Tente novamente.', 'error');
                
                // Remove efeitos visuais após um tempo
                setTimeout(() => {
                    document.querySelectorAll('.selected').forEach(card => {
                        card.classList.remove('selected');
                    });
                }, 1000);
            }
            
            // Reset seleções
            selectedImage = null;
            selectedName = null;
            updateDisplay();
        }

        function showCompletionMessage() {
            const message = document.getElementById('message');
            message.innerHTML = `
                <div class="completion">
                    🏆 Parabéns! Você completou o jogo!<br>
                    Pontuação Final: ${score} pontos<br>
                    <small>Clique em "Novo Jogo" para jogar novamente!</small>
                </div>
            `;
        }

        function showMessage(text, type) {
            const message = document.getElementById('message');
            message.textContent = text;
            message.className = `message ${type}`;
        }

        function updateDisplay() {
            document.getElementById('score').textContent = score;
            document.getElementById('matches').textContent = matches;
        }

        function resetGame() {
            selectedImage = null;
            selectedName = null;
            score = 0;
            matches = 0;
            matchedItems.clear();
            
            // Remove todas as classes de estado
            document.querySelectorAll('.image-card, .name-card').forEach(card => {
                card.classList.remove('selected', 'correct', 'matched', 'pulse');
            });
            
            updateDisplay();
            shuffleItems();
            shuffleImages();
            showMessage('Novo jogo iniciado! Boa sorte!', 'success');
        }

        // Event listeners
        document.addEventListener('DOMContentLoaded', function() {
            // Adiciona listeners para imagens
            document.querySelectorAll('.image-card').forEach(card => {
                card.addEventListener('click', () => selectImage(card));
            });
            
            // Adiciona listeners para nomes
            document.querySelectorAll('.name-card').forEach(card => {
                card.addEventListener('click', () => selectName(card));
            });
            
            initGame();
        });

        // Adiciona efeitos sonoros visuais
        function addVisualEffect(element, effect) {
            element.style.transform = 'scale(1.1)';
            setTimeout(() => {
                element.style.transform = '';
            }, 200);
        }

        // Previne seleção de texto
        document.addEventListener('selectstart', function(e) {
            e.preventDefault();
        });