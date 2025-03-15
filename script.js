// 获取 DOM 元素
const puzzleContainer = document.getElementById('puzzle-container');
const usedStepsDisplay = document.getElementById('used-steps');

// 游戏变量初始化
let rows = 3;
let cols = 3;
let pieceSize = 100;
let emptyPiece = { row: rows - 1, col: cols - 1 };
let usedSteps = 0;

// 随机选择拼图图片
const images = ['spike1.jpg', 'spike2.jpg', 'spike3.jpg', 'spike4.jpg'];
const currentImage = images[Math.floor(Math.random() * images.length)];

// 创建拼图
function createPuzzle() {
    puzzleContainer.innerHTML = '';
    const pieces = [];

    // 生成拼图块
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const piece = document.createElement('div');
            piece.className = 'puzzle-piece';
            piece.style.backgroundImage = `url(${currentImage})`;
            piece.style.backgroundPosition = `-${col * pieceSize}px -${row * pieceSize}px`;
            piece.dataset.row = row;
            piece.dataset.col = col;
            piece.addEventListener('click', movePiece);
            puzzleContainer.appendChild(piece);
            pieces.push({ element: piece, row, col });
        }
    }

    // 移除最后一块作为空白块
    pieces.pop();
    shufflePieces(pieces);
    updateEmptyPiecePosition();

    // 初始化步数显示
    usedSteps = 0;
    usedStepsDisplay.textContent = usedSteps;
}

// 打乱拼图块
function shufflePieces(pieces) {
    for (let i = pieces.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pieces[i], pieces[j]] = [pieces[j], pieces[i]];
        swapPieces(pieces[i], pieces[j]);
    }
}

// 交换两个拼图块的位置
function swapPieces(piece1, piece2) {
    const tempRow = piece1.row;
    const tempCol = piece1.col;
    piece1.row = piece2.row;
    piece1.col = piece2.col;
    piece2.row = tempRow;
    piece2.col = tempCol;

    piece1.element.style.order = piece1.row * cols + piece1.col;
    piece2.element.style.order = piece2.row * cols + piece2.col;
}

// 移动拼图块
function movePiece() {
    const row = parseInt(this.dataset.row);
    const col = parseInt(this.dataset.col);

    // 检查是否可以移动
    if (
        (row === emptyPiece.row && Math.abs(col - emptyPiece.col) === 1) ||
        (col === emptyPiece.col && Math.abs(row - emptyPiece.row) === 1)
    ) {
        const currentPiece = { element: this, row, col };
        const emptyPieceElement = document.querySelector(`[data-row="${emptyPiece.row}"][data-col="${emptyPiece.col}"]`);
        const emptyPieceObj = { element: emptyPieceElement, row: emptyPiece.row, col: emptyPiece.col };

        swapPieces(currentPiece, emptyPieceObj);
        emptyPiece.row = row;
        emptyPiece.col = col;

        usedSteps++;
        usedStepsDisplay.textContent = usedSteps;

        // 检查是否完成拼图
        if (isPuzzleSolved()) {
            alert('恭喜你，完成拼图！');
        }
    }
}

// 检查拼图是否完成
function isPuzzleSolved() {
    const pieces = Array.from(puzzleContainer.children);
    for (let i = 0; i < pieces.length; i++) {
        const piece = pieces[i];
        const row = parseInt(piece.dataset.row);
        const col = parseInt(piece.dataset.col);
        const expectedOrder = row * cols + col;
        if (piece.style.order !== expectedOrder.toString()) {
            return false;
        }
    }
    return true;
}

// 更新空白块的位置
function updateEmptyPiecePosition() {
    emptyPiece.row = rows - 1;
    emptyPiece.col = cols - 1;
}

// 页面加载完成后创建拼图
window.addEventListener('load', createPuzzle);