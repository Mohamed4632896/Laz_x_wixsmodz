// Function to show loading animation
function showLoading() {
    const overlay = document.querySelector('.loading-overlay');
    overlay.classList.add('active');
}

// Function to hide loading animation
function hideLoading() {
    const overlay = document.querySelector('.loading-overlay');
    overlay.classList.remove('active');
}

// Countdown timer function (works for both ascending and descending)
function startCountdown() {
    const days = document.getElementById('days');
    const hours = document.getElementById('hours');
    const minutes = document.getElementById('minutes');
    const seconds = document.getElementById('seconds');
    
    if (!days || !hours || !minutes || !seconds) return;
    
    // Set initial values (starting from 2 days)
    let d = 2;
    let h = 0;
    let m = 0;
    let s = 0;
    
    // Update display initially
    days.textContent = d < 10 ? '0' + d : d;
    hours.textContent = h < 10 ? '0' + h : h;
    minutes.textContent = m < 10 ? '0' + m : m;
    seconds.textContent = s < 10 ? '0' + s : s;
    
    // Update the count up every 1 second
    const x = setInterval(function() {
        s++;
        if (s >= 60) {
            s = 0;
            m++;
            if (m >= 60) {
                m = 0;
                h++;
                if (h >= 24) {
                    h = 0;
                    d++;
                }
            }
        }
        
        // Display the result
        days.textContent = d < 10 ? '0' + d : d;
        hours.textContent = h < 10 ? '0' + h : h;
        minutes.textContent = m < 10 ? '0' + m : m;
        seconds.textContent = s < 10 ? '0' + s : s;
    }, 1000);
}

// Calculate investment results
function calculateInvestment() {
    const slider = document.getElementById('amountSlider');
    const amountDisplay = document.getElementById('amount-display');
    const dailyResult = document.getElementById('daily-result');
    const totalResult = document.getElementById('total-result');
    
    if (!slider || !amountDisplay || !dailyResult || !totalResult) return;
    
    // Update display and calculate results
    function updateResults() {
        const amount = parseFloat(slider.value);
        amountDisplay.textContent = amount;
        
        // Calculate daily result (50% of investment)
        const daily = amount * 0.5;
        dailyResult.textContent = daily.toFixed(2) + " ₽";
        
        // Calculate 20-day result
        const total = daily * 20;
        totalResult.textContent = total.toFixed(2) + " ₽";
    }
    
    // Initial calculation
    updateResults();
    
    // Update when slider changes
    slider.addEventListener('input', updateResults);
}

// Generate random user data for tables
function generateRandomUser() {
    // Random name generator
    const namePrefix = ['USER', 'ALEX', 'MARIA', 'JOHN', 'SARA', 'DAVID', 'EMMA', 'MIKE', 'ANNA', 'AHMAD', 'MOHAMMED', 'ALI'];
    const getRandomName = () => {
        const prefix = namePrefix[Math.floor(Math.random() * namePrefix.length)];
        const number = Math.floor(Math.random() * 10000);
        return prefix + number;
    };
    
    // Generate random countdown time
    const getRandomCountdown = () => {
        // Random minutes between 60 and 1440 (1 hour to 24 hours)
        const randomMinutes = Math.floor(Math.random() * 1380 + 60);
        const hours = Math.floor(randomMinutes / 60);
        const minutes = randomMinutes % 60;
        return {
            display: `${hours}:${minutes < 10 ? '0' + minutes : minutes}`,
            totalMinutes: randomMinutes
        };
    };
    
    // Generate random amount between 50 and 5000
    const getRandomAmount = () => {
        return Math.floor(Math.random() * 4950 + 50);
    };
    
    // Generate random investment user
    const generateInvestmentUser = () => {
        const name = getRandomName();
        const countdown = getRandomCountdown();
        const amount = getRandomAmount();
        const profit = Math.floor(amount * 0.5);
        
        return {
            name,
            countdown,
            amount,
            profit
        };
    };
    
    // Generate random withdrawal user
    const generateWithdrawalUser = () => {
        const name = getRandomName();
        const countdown = getRandomCountdown();
        const amount = getRandomAmount();
        
        return {
            name,
            countdown,
            amount
        };
    };
    
    return {
        generateInvestmentUser,
        generateWithdrawalUser
    };
}

// Add new user to investment table
function addRandomUserToInvestmentTable() {
    const tableBody = document.getElementById('users-table-body');
    if (!tableBody) return;
    
    const randomUser = generateRandomUser().generateInvestmentUser();
    
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td class="user-cell"><i class="fas fa-user"></i> ${randomUser.name}</td>
        <td class="countdown-cell" data-minutes="${randomUser.countdown.totalMinutes}">${randomUser.countdown.display}</td>
        <td class="rate">50%</td>
        <td>${randomUser.amount} <span class="currency">RUB</span></td>
        <td>${randomUser.profit} <span class="currency">RUB</span></td>
    `;
    
    // Add to the beginning of the table
    tableBody.insertBefore(newRow, tableBody.firstChild);
    
    // Keep only 8 rows
    while (tableBody.children.length > 8) {
        tableBody.removeChild(tableBody.lastChild);
    }
}

// Add new user to withdrawal table
function addRandomUserToWithdrawalTable() {
    const tableBody = document.getElementById('withdrawals-table-body');
    if (!tableBody) return;
    
    const randomUser = generateRandomUser().generateWithdrawalUser();
    
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td class="user-cell"><i class="fas fa-user"></i> ${randomUser.name}</td>
        <td class="countdown-cell" data-minutes="${randomUser.countdown.totalMinutes}">${randomUser.countdown.display}</td>
        <td>${randomUser.amount} <span class="currency">RUB</span></td>
        <td class="status success">تم</td>
    `;
    
    // Add to the beginning of the table
    tableBody.insertBefore(newRow, tableBody.firstChild);
    
    // Keep only 8 rows
    while (tableBody.children.length > 8) {
        tableBody.removeChild(tableBody.lastChild);
    }
}

// Update countdowns for all users
function updateUserCountdowns() {
    const countdownCells = document.querySelectorAll('.countdown-cell');
    
    countdownCells.forEach(cell => {
        let minutes = parseInt(cell.getAttribute('data-minutes')) - 1;
        
        if (minutes <= 0) {
            // Remove the row if time is up
            if (cell.parentNode) {
                cell.parentNode.remove();
            }
        } else {
            // Update the countdown
            cell.setAttribute('data-minutes', minutes);
            const hours = Math.floor(minutes / 60);
            const mins = minutes % 60;
            cell.textContent = `${hours}:${mins < 10 ? '0' + mins : mins}`;
        }
    });
}

// Handle deposit amount updates
function handleDepositCalculator() {
    const depositAmount = document.getElementById('deposit-amount');
    if (!depositAmount) return;
    
    function updateCalculations() {
        const amount = parseFloat(depositAmount.value);
        const dailyProfit = amount * 0.5;
        const totalProfit = dailyProfit * 20;
        
        document.querySelectorAll('.calculator-value')[0].textContent = `${amount.toFixed(2)} ₽`;
        document.querySelectorAll('.calculator-value')[1].textContent = `${dailyProfit.toFixed(2)} ₽`;
        document.querySelectorAll('.calculator-value')[2].textContent = `${totalProfit.toFixed(2)} ₽`;
    }
    
    // Initial update
    updateCalculations();
    
    // Update on change
    depositAmount.addEventListener('input', updateCalculations);
}

// Handle copy referral link button
function handleCopyReferralLink() {
    const copyBtn = document.getElementById('copy-referral');
    const referralLink = document.getElementById('referral-link');
    
    if (!copyBtn || !referralLink) return;
    
    copyBtn.addEventListener('click', function() {
        referralLink.select();
        document.execCommand('copy');
        
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i>';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
        }, 2000);
    });
}

// Handle bonus button click
function handleBonusButton() {
    const bonusBtn = document.querySelector('.get-bonus-button');
    if (!bonusBtn) return;
    
    bonusBtn.addEventListener('click', function() {
        showLoading();
        
        setTimeout(() => {
            hideLoading();
            alert('تم إضافة مكافأة 5 روبل إلى حسابك!');
            bonusBtn.disabled = true;
            bonusBtn.textContent = 'تم استلام المكافأة لهذا اليوم';
            bonusBtn.style.backgroundColor = '#aaa';
        }, 1500);
    });
}

// Handle deposit button click
function handleDepositButton() {
    const depositBtn = document.querySelector('.deposit-button');
    if (!depositBtn) return;
    
    depositBtn.addEventListener('click', function() {
        window.location.href = 'deposit.html';
    });
    
    const depositSubmitBtn = document.querySelector('.deposit-submit-btn');
    if (!depositSubmitBtn) return;
    
    depositSubmitBtn.addEventListener('click', function() {
        showLoading();
        
        setTimeout(() => {
            hideLoading();
            alert('تم إرسال طلب الإيداع بنجاح!');
            window.location.href = 'hello.html';
        }, 1500);
    });
}

// Handle page transitions
document.addEventListener('DOMContentLoaded', function() {
    // Show initial loading
    showLoading();
    setTimeout(hideLoading, 500); // Half second loading on initial page load
    
    // Initialize the user data if on user pages
    if (window.location.pathname.includes('hello.html') || 
        window.location.pathname.includes('account_info.html')) {
        
        // If there's saved user data, show it
        if (localStorage.getItem('username')) {
            const username = localStorage.getItem('username');
            const payeer = localStorage.getItem('payeer');
            
            if (document.getElementById('username-display')) {
                document.getElementById('username-display').textContent = username;
            }
            
            if (document.getElementById('payeer-display')) {
                document.getElementById('payeer-display').textContent = payeer;
            }
        }
    }
    
    // Start countdown timer
    startCountdown();
    
    // Initialize calculator on index page
    calculateInvestment();
    
    // Initialize deposit calculator
    handleDepositCalculator();
    
    // Initialize copy referral button
    handleCopyReferralLink();
    
    // Initialize bonus button
    handleBonusButton();
    
    // Initialize deposit button
    handleDepositButton();
    
    // Start tables auto-updates if on dashboard page with tables
    if (document.getElementById('users-table-body') && document.getElementById('withdrawals-table-body')) {
        // Update countdowns every minute
        setInterval(updateUserCountdowns, 60000);
        
        // Add new users every 5 minutes (reduced to 30 seconds for testing)
        setInterval(() => {
            addRandomUserToInvestmentTable();
            addRandomUserToWithdrawalTable();
        }, 30000); // 30 seconds for testing (change to 300000 for 5 minutes)
    }
    
    // Handle links
    const links = document.querySelectorAll('nav a, .dashboard-menu a');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            if (!this.classList.contains('active')) {
                e.preventDefault();
                const href = this.getAttribute('href');
                
                showLoading();
                
                // Simulate page loading - reduced to 0.5 seconds
                setTimeout(() => {
                    window.location.href = href;
                }, 500);
            }
        });
    });
    
    // Handle login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            if (username.length < 8) {
                alert('اسم المستخدم يجب أن يحتوي على أكثر من 8 أحرف وأرقام');
                return;
            }
            
            if (password.length < 6) {
                alert('كلمة السر يجب أن تحتوي على أكثر من 6 أحرف وأرقام');
                return;
            }
            
            // Save username in localStorage for demo
            localStorage.setItem('username', username);
            
            showLoading();
            
            // Redirect to hello page
            setTimeout(() => {
                hideLoading();
                window.location.href = 'hello.html';
            }, 500);
        });
    }
    
    // Handle register form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const payeer = document.getElementById('payeer').value;
            const username = document.getElementById('reg-username').value;
            const password = document.getElementById('reg-password').value;
            
            if (!payeer.startsWith('P') || payeer.length < 7) {
                alert('رقم حساب البايرو يجب أن يبدأ بـ P ويحتوي على أكثر من 6 أحرف');
                return;
            }
            
            if (username.length < 8) {
                alert('اسم المستخدم يجب أن يحتوي على أكثر من 8 أحرف وأرقام');
                return;
            }
            
            if (password && password.length < 6) {
                alert('كلمة السر يجب أن تحتوي على أكثر من 6 أحرف وأرقام');
                return;
            }
            
            // Save user data in localStorage for demo
            localStorage.setItem('payeer', payeer);
            localStorage.setItem('username', username);
            
            showLoading();
            
            // Redirect to login page
            setTimeout(() => {
                hideLoading();
                window.location.href = 'login.html';
            }, 500);
        });
    }
    
    // Handle contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            showLoading();
            
            // Simulate form submission
            setTimeout(() => {
                hideLoading();
                alert('تم إرسال رسالتك بنجاح!');
                contactForm.reset();
            }, 500);
        });
    }
    
    // Handle start earning button
    const startButton = document.querySelector('.start-now-btn');
    if (startButton) {
        startButton.addEventListener('click', function() {
            showLoading();
            
            // Redirect to register page
            setTimeout(() => {
                window.location.href = 'register.html';
            }, 500);
        });
    }
});