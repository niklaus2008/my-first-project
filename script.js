/**
 * 复古卡西欧计算器功能实现
 * @author AI Assistant
 * @version 1.0.0
 */

class Calculator {
    /**
     * 初始化计算器
     */
    constructor() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.shouldResetScreen = false;
        
        this.currentDisplay = document.getElementById('current');
        this.historyDisplay = document.getElementById('history');
        
        this.initializeEventListeners();
    }

    /**
     * 初始化事件监听器
     */
    initializeEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            const buttons = document.querySelectorAll('.btn');
            
            buttons.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.handleButtonClick(button);
                });
            });
        });
    }

    /**
     * 处理按钮点击事件
     * @param {HTMLElement} button - 被点击的按钮元素
     */
    handleButtonClick(button) {
        const action = button.dataset.action;
        const value = button.dataset.value;
        
        // 添加按钮点击动画
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 100);

        if (value) {
            this.appendNumber(value);
        } else if (action) {
            this.handleAction(action);
        }
        
        this.updateDisplay();
    }

    /**
     * 添加数字到显示屏
     * @param {string} number - 要添加的数字
     */
    appendNumber(number) {
        if (this.shouldResetScreen) {
            this.currentOperand = '';
            this.shouldResetScreen = false;
        }
        
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number;
        } else {
            this.currentOperand += number;
        }
    }

    /**
     * 处理操作按钮
     * @param {string} action - 操作类型
     */
    handleAction(action) {
        switch (action) {
            case 'delete':
                this.delete();
                break;
            case 'equals':
                this.compute();
                break;
            case 'add':
            case 'subtract':
            case 'multiply':
                this.chooseOperation(action);
                break;
            case 'power':
                this.power();
                break;
            case 'log':
                this.logarithm();
                break;
            case 'ln':
                this.naturalLog();
                break;
            case 'sin':
                this.sine();
                break;
            case 'cos':
                this.cosine();
                break;
            case 'tan':
                this.tangent();
                break;
            case 'negative':
                this.toggleSign();
                break;
            case 'on':
                this.clear();
                break;
            default:
                // 其他功能键暂时不实现具体功能
                this.showMessage('功能开发中...');
                break;
        }
    }

    /**
     * 选择运算符
     * @param {string} operation - 运算符
     */
    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.shouldResetScreen = true;
    }

    /**
     * 执行计算
     */
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (this.operation) {
            case 'add':
                computation = prev + current;
                break;
            case 'subtract':
                computation = prev - current;
                break;
            case 'multiply':
                computation = prev * current;
                break;
            default:
                return;
        }
        
        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.previousOperand = '';
    }

    /**
     * 删除最后一个字符
     */
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        if (this.currentOperand === '') {
            this.currentOperand = '0';
        }
    }

    /**
     * 清除所有数据
     */
    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.shouldResetScreen = false;
    }

    /**
     * 幂运算
     */
    power() {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;
        this.currentOperand = Math.pow(current, 2).toString();
    }

    /**
     * 对数运算
     */
    logarithm() {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current) || current <= 0) {
            this.showMessage('无效输入');
            return;
        }
        this.currentOperand = Math.log10(current).toString();
    }

    /**
     * 自然对数
     */
    naturalLog() {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current) || current <= 0) {
            this.showMessage('无效输入');
            return;
        }
        this.currentOperand = Math.log(current).toString();
    }

    /**
     * 正弦函数
     */
    sine() {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;
        this.currentOperand = Math.sin(current * Math.PI / 180).toString();
    }

    /**
     * 余弦函数
     */
    cosine() {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;
        this.currentOperand = Math.cos(current * Math.PI / 180).toString();
    }

    /**
     * 正切函数
     */
    tangent() {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;
        this.currentOperand = Math.tan(current * Math.PI / 180).toString();
    }

    /**
     * 切换正负号
     */
    toggleSign() {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;
        this.currentOperand = (-current).toString();
    }

    /**
     * 显示消息
     * @param {string} message - 要显示的消息
     */
    showMessage(message) {
        const originalText = this.currentDisplay.textContent;
        this.currentDisplay.textContent = message;
        setTimeout(() => {
            this.currentDisplay.textContent = originalText;
        }, 2000);
    }

    /**
     * 格式化显示数字
     * @param {string} number - 要格式化的数字
     * @returns {string} 格式化后的数字字符串
     */
    formatDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }
        
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    /**
     * 更新显示屏
     */
    updateDisplay() {
        this.currentDisplay.textContent = this.formatDisplayNumber(this.currentOperand);
        
        if (this.operation != null) {
            const operationSymbol = this.getOperationSymbol(this.operation);
            this.historyDisplay.textContent = `${this.formatDisplayNumber(this.previousOperand)} ${operationSymbol}`;
        } else {
            this.historyDisplay.textContent = '';
        }
    }

    /**
     * 获取运算符符号
     * @param {string} operation - 运算符
     * @returns {string} 运算符符号
     */
    getOperationSymbol(operation) {
        switch (operation) {
            case 'add': return '+';
            case 'subtract': return '-';
            case 'multiply': return '×';
            default: return '';
        }
    }
}

// 初始化计算器
const calculator = new Calculator(); 