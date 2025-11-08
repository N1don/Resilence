let currentChart = null;

function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeIcon.textContent = '☀️';
    }

    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-theme');
        
        if (document.body.classList.contains('light-theme')) {
            themeIcon.textContent = '☀️';
            localStorage.setItem('theme', 'light');
        } else {
            themeIcon.textContent = '🌙';
            localStorage.setItem('theme', 'dark');
        }

        if (currentChart) {
            const activeButton = document.querySelector('.graph-btn.active');
            if (activeButton) {
                const graphKey = activeButton.getAttribute('data-graph');
                const keyMap = {
                    'explosions': 'explosions',
                    'alarms-time': 'alarmsTime',
                    'business-loss': 'businessLoss',
                    'odesa-rent': 'odesaRent',
                    'mykolaiv-rent': 'mykolaivRent',
                    'kherson-rent': 'khersonRent'
                };
                createChart(keyMap[graphKey]);
            }
        }
    });
}

const graphData = {
    explosions: {
        title: 'Повідомлення про вибухи від ЗМІ в 2024 році',
        description: 'Херсон лідирує з величезним відривом - 779 повідомлень про вибухи за рік. Це підтверджує, що місто перебуває під постійними обстрілами. Одеса на другому місці з 171 повідомленням. Миколаїв має значно менше повідомлень - 45, що показує відносно кращу ситуацію порівняно з іншими двома містами.',
        data: {
            labels: ['Одеса', 'Одеська обл.', 'Миколаїв', 'Миколаївська обл.', 'Херсон', 'Херсонська обл.'],
            datasets: [{
                label: 'Кількість повідомлень про вибухи',
                data: [171, 142, 45, 89, 779, 512],
                backgroundColor: [
                    'rgba(0, 217, 255, 0.8)',
                    'rgba(0, 188, 212, 0.7)',
                    'rgba(0, 217, 255, 0.8)',
                    'rgba(0, 188, 212, 0.7)',
                    'rgba(255, 87, 87, 0.8)',
                    'rgba(255, 107, 107, 0.7)'
                ],
                borderColor: [
                    'rgba(0, 217, 255, 1)',
                    'rgba(0, 188, 212, 1)',
                    'rgba(0, 217, 255, 1)',
                    'rgba(0, 188, 212, 1)',
                    'rgba(255, 87, 87, 1)',
                    'rgba(255, 107, 107, 1)'
                ],
                borderWidth: 2
            }]
        },
        type: 'bar'
    },
    
    alarmsTime: {
        title: 'Кількість тривог у різний час доби, 2024 р.',
        description: 'Херсон показує найбільшу кількість тривог протягом доби, особливо в денний та вечірній час. Пік активності спостерігається в період з 20:00 до 22:00, коли кількість тривог сягає 90-96. Миколаїв займає проміжне положення. Одеса демонструє найменшу кількість тривог серед трьох міст.',
        data: {
            labels: ['0:00', '2:00', '4:00', '6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
            datasets: [
                {
                    label: 'Херсон',
                    data: [85, 83, 82, 84, 86, 88, 89, 91, 93, 94, 96, 95],
                    borderColor: 'rgba(255, 87, 87, 1)',
                    backgroundColor: 'rgba(255, 87, 87, 0.3)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Миколаїв',
                    data: [60, 58, 57, 59, 61, 62, 63, 64, 65, 66, 67, 66],
                    borderColor: 'rgba(0, 188, 212, 1)',
                    backgroundColor: 'rgba(0, 188, 212, 0.3)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Одеса',
                    data: [55, 52, 50, 53, 54, 56, 57, 58, 59, 58, 57, 56],
                    borderColor: 'rgba(0, 217, 255, 1)',
                    backgroundColor: 'rgba(0, 217, 255, 0.3)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        type: 'line'
    },
    
    businessLoss: {
        title: 'Частка тривалості тривог від загального часу роботи ТРЦ, 2024 р.',
        description: 'Графік показує, яку частину робочого часу торговельні центри втрачають через повітряні тривоги. Херсон лідирує за негативними показниками - на початку року частка простою сягала 23,20%. До кінця року спостерігається поступове зниження до 4-5%, що свідчить про адаптацію бізнесу. Одеса має найкращі показники серед трьох міст.',
        data: {
            labels: ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'],
            datasets: [
                {
                    label: 'Херсон (%)',
                    data: [23.2, 16.6, 12.4, 10.8, 8.5, 7.2, 6.1, 5.8, 5.2, 4.9, 4.6, 4.4],
                    borderColor: 'rgba(255, 87, 87, 1)',
                    backgroundColor: 'rgba(255, 87, 87, 0.3)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Миколаїв (%)',
                    data: [19.4, 12.8, 9.6, 7.8, 6.2, 5.4, 4.8, 4.2, 3.8, 3.5, 3.2, 3.0],
                    borderColor: 'rgba(0, 188, 212, 1)',
                    backgroundColor: 'rgba(0, 188, 212, 0.3)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Одеса (%)',
                    data: [9.5, 7.8, 7.2, 6.5, 5.8, 5.2, 4.8, 4.5, 4.2, 4.0, 3.8, 3.5],
                    borderColor: 'rgba(0, 217, 255, 1)',
                    backgroundColor: 'rgba(0, 217, 255, 0.3)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        type: 'line'
    },
    
    odesaRent: {
        title: 'Частота повітряних тривог і вартість оренди житла у м. Одеса, 2024 р.',
        description: 'Одеса протягом 2024 року мала стабільну кількість повітряних тривог - у середньому 65-70 на місяць. Кількість тривог майже не вплинула на ринок оренди: ціни продовжують зростати влітку - до 20-25 тисяч грн, що пояснюється туристичним сезоном, приїздом студентів та активністю ІТ-сектору.',
        data: {
            labels: ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'],
            datasets: [
                {
                    label: 'Кількість тривог',
                    data: [68, 65, 70, 67, 66, 68, 70, 72, 69, 67, 65, 66],
                    borderColor: 'rgba(255, 193, 7, 1)',
                    backgroundColor: 'rgba(255, 193, 7, 0.3)',
                    yAxisID: 'y',
                    tension: 0.4
                },
                {
                    label: 'Вартість оренди (тис. грн)',
                    data: [12, 13, 14, 15, 17, 20, 25, 24, 18, 16, 14, 13],
                    borderColor: 'rgba(0, 217, 255, 1)',
                    backgroundColor: 'rgba(0, 217, 255, 0.3)',
                    yAxisID: 'y1',
                    tension: 0.4
                }
            ]
        },
        type: 'line',
        scales: {
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                title: {
                    display: true,
                    text: 'Кількість тривог',
                    color: '#e0e0e0'
                }
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                title: {
                    display: true,
                    text: 'Вартість оренди (тис. грн)',
                    color: '#e0e0e0'
                },
                grid: {
                    drawOnChartArea: false
                }
            }
        }
    },
    
    mykolaivRent: {
        title: 'Частота повітряних тривог і вартість оренди житла у м. Миколаїв, 2024 р.',
        description: 'Миколаїв у 2024 році мав коливну кількість повітряних тривог - від 68 до 139 на місяць. Ціни на житло залишаються волатильними - від 4500 до 10500 грн, без прямого зв\'язку з кількістю тривог. Попит зростає влітку та восени, коли частина мешканців повертається.',
        data: {
            labels: ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'],
            datasets: [
                {
                    label: 'Кількість тривог',
                    data: [139, 125, 98, 85, 76, 68, 72, 88, 95, 102, 110, 115],
                    borderColor: 'rgba(255, 193, 7, 1)',
                    backgroundColor: 'rgba(255, 193, 7, 0.3)',
                    yAxisID: 'y',
                    tension: 0.4
                },
                {
                    label: 'Вартість оренди (тис. грн)',
                    data: [5.5, 5.2, 4.8, 5.0, 6.5, 8.0, 10.5, 10.0, 8.5, 7.5, 6.5, 6.0],
                    borderColor: 'rgba(0, 188, 212, 1)',
                    backgroundColor: 'rgba(0, 188, 212, 0.3)',
                    yAxisID: 'y1',
                    tension: 0.4
                }
            ]
        },
        type: 'line',
        scales: {
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                title: {
                    display: true,
                    text: 'Кількість тривог',
                    color: '#e0e0e0'
                }
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                title: {
                    display: true,
                    text: 'Вартість оренди (тис. грн)',
                    color: '#e0e0e0'
                },
                grid: {
                    drawOnChartArea: false
                }
            }
        }
    },
    
    khersonRent: {
        title: 'Частота повітряних тривог і вартість оренди житла у м. Херсон, 2024 р.',
        description: 'У 2024 році Херсон зазнавав надзвичайно інтенсивних атак - понад 218 тисяч снарядів за рік. Кількість тривог сягала 139-156 на місяць. Через постійні обстріли та масовий виїзд населення ринок нерухомості практично не функціонує. Дані про ціни на житло неможливо визначити достовірно.',
        data: {
            labels: ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'],
            datasets: [
                {
                    label: 'Кількість тривог',
                    data: [156, 139, 145, 142, 148, 152, 158, 165, 172, 175, 168, 162],
                    borderColor: 'rgba(255, 87, 87, 1)',
                    backgroundColor: 'rgba(255, 87, 87, 0.3)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        type: 'line'
    }
};

function isMobile() {
    return window.innerWidth <= 768;
}

function createChart(graphKey) {
    const canvas = document.getElementById('mainChart');
    const ctx = canvas.getContext('2d');
    const description = document.getElementById('chartDescription');

    if (currentChart) {
        currentChart.destroy();
    }
    
    const graph = graphData[graphKey];
    const mobile = isMobile();
    const isLightTheme = document.body.classList.contains('light-theme');

    const colors = {
        text: isLightTheme ? '#333333' : '#e0e0e0',
        title: isLightTheme ? '#667eea' : '#00d9ff',
        grid: isLightTheme ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'
    };

    const config = {
        type: graph.type,
        data: graph.data,
        options: {
            responsive: true,
            maintainAspectRatio: !mobile,
            aspectRatio: mobile ? 1 : 2,
            plugins: {
                legend: {
                    display: true,
                    position: mobile ? 'bottom' : 'top',
                    labels: {
                        color: colors.text,
                        font: {
                            size: mobile ? 10 : 14
                        },
                        padding: mobile ? 8 : 10,
                        boxWidth: mobile ? 30 : 40
                    }
                },
                title: {
                    display: true,
                    text: graph.title,
                    color: colors.title,
                    font: {
                        size: mobile ? 12 : 18,
                        weight: 'bold'
                    },
                    padding: {
                        top: mobile ? 5 : 10,
                        bottom: mobile ? 10 : 20
                    }
                },
                tooltip: {
                    titleFont: {
                        size: mobile ? 11 : 14
                    },
                    bodyFont: {
                        size: mobile ? 10 : 13
                    },
                    padding: mobile ? 8 : 12
                }
            },
            scales: graph.scales || {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: colors.text,
                        font: {
                            size: mobile ? 9 : 12
                        },
                        maxTicksLimit: mobile ? 6 : 10
                    },
                    grid: {
                        color: colors.grid
                    }
                },
                x: {
                    ticks: {
                        color: colors.text,
                        font: {
                            size: mobile ? 8 : 12
                        },
                        maxRotation: mobile ? 45 : 0,
                        minRotation: mobile ? 45 : 0
                    },
                    grid: {
                        color: colors.grid
                    }
                }
            }
        }
    };
    
    if (graph.scales) {
        config.options.scales.y = {
            ...graph.scales.y,
            ticks: { 
                color: colors.text,
                font: {
                    size: mobile ? 9 : 12
                },
                maxTicksLimit: mobile ? 5 : 8
            },
            grid: { color: colors.grid },
            title: {
                ...graph.scales.y.title,
                color: colors.text
            }
        };
        config.options.scales.y1 = {
            ...graph.scales.y1,
            ticks: { 
                color: colors.text,
                font: {
                    size: mobile ? 9 : 12
                },
                maxTicksLimit: mobile ? 5 : 8
            },
            grid: { color: colors.grid },
            title: {
                ...graph.scales.y1.title,
                color: colors.text
            }
        };
        config.options.scales.x = {
            ticks: { 
                color: colors.text,
                font: {
                    size: mobile ? 8 : 12
                },
                maxRotation: mobile ? 45 : 0,
                minRotation: mobile ? 45 : 0
            },
            grid: { color: colors.grid }
        };
    }

    currentChart = new Chart(ctx, config);

    description.innerHTML = `
        <h3>${graph.title}</h3>
        <p>${graph.description}</p>
    `;
}

document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
    
    const buttons = document.querySelectorAll('.graph-btn');

    createChart('explosions');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            buttons.forEach(btn => btn.classList.remove('active'));

            this.classList.add('active');

            const graphKey = this.getAttribute('data-graph');
            
            const keyMap = {
                'explosions': 'explosions',
                'alarms-time': 'alarmsTime',
                'business-loss': 'businessLoss',
                'odesa-rent': 'odesaRent',
                'mykolaiv-rent': 'mykolaivRent',
                'kherson-rent': 'khersonRent'
            };
            
            createChart(keyMap[graphKey]);
        });
    });
    
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            const activeButton = document.querySelector('.graph-btn.active');
            if (activeButton) {
                const graphKey = activeButton.getAttribute('data-graph');
                const keyMap = {
                    'explosions': 'explosions',
                    'alarms-time': 'alarmsTime',
                    'business-loss': 'businessLoss',
                    'odesa-rent': 'odesaRent',
                    'mykolaiv-rent': 'mykolaivRent',
                    'kherson-rent': 'khersonRent'
                };
                createChart(keyMap[graphKey]);
            }
        }, 250);
    });
});


