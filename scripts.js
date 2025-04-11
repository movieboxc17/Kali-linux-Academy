document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation menu toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    if (burger && nav) {
        burger.addEventListener('click', function() {
            // Toggle navigation
            nav.classList.toggle('nav-active');
            
            // Animate burger
            burger.classList.toggle('toggle');
            
            // Animate links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
        });
        
        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                    
                    navLinks.forEach(link => {
                        link.style.animation = '';
                    });
                }
            });
        });
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            if (emailInput.value.trim() !== '' && validateEmail(emailInput.value)) {
                // Success notification
                showNotification('Thank you for subscribing to our newsletter!', 'success');
                emailInput.value = '';
            } else {
                // Error notification
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    }
    
    // Email validation helper function
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Notification helper function
    function showNotification(message, type) {
        // Check if notification container exists, if not create it
        let notificationContainer = document.querySelector('.notification-container');
        if (!notificationContainer) {
            notificationContainer = document.createElement('div');
            notificationContainer.className = 'notification-container';
            document.body.appendChild(notificationContainer);
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add to container
        notificationContainer.appendChild(notification);
        
        // Add event listener to close button
        notification.querySelector('.notification-close').addEventListener('click', function() {
            notification.remove();
        });
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Account for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation for cards on scroll
    const toolCards = document.querySelectorAll('.tool-card');
    const tutorialCards = document.querySelectorAll('.tutorial-card');
    const featureCards = document.querySelectorAll('.feature-card');
    const challengeCards = document.querySelectorAll('.challenge-card');
    
    const animateOnScroll = function() {
        const triggerPosition = window.innerHeight / 1.2;
        
        function animateCards(cards) {
            cards.forEach(card => {
                const cardTop = card.getBoundingClientRect().top;
                if (cardTop < triggerPosition) {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }
            });
        }
        
        animateCards(toolCards);
        animateCards(tutorialCards);
        animateCards(featureCards);
        animateCards(challengeCards);
    };
    
    // Set initial styles for animation
    function initializeCardAnimations(cards) {
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
    }
    
    initializeCardAnimations(toolCards);
    initializeCardAnimations(tutorialCards);
    initializeCardAnimations(featureCards);
    initializeCardAnimations(challengeCards);
    
    // Run animation check on load and scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // Clipboard.js initialization for copy buttons
    if (typeof ClipboardJS !== 'undefined') {
        const clipboard = new ClipboardJS('.copy-btn');
        
        clipboard.on('success', function(e) {
            // Reset icon of previously clicked button if any
            document.querySelectorAll('.copy-btn.copied').forEach(btn => {
                btn.innerHTML = '<i class="fas fa-copy"></i>';
                btn.classList.remove('copied');
            });
            
            // Update current button
            e.trigger.innerHTML = '<i class="fas fa-check"></i>';
            e.trigger.classList.add('copied');
            
            // Reset after 1.5 seconds
            setTimeout(() => {
                e.trigger.innerHTML = '<i class="fas fa-copy"></i>';
                e.trigger.classList.remove('copied');
            }, 1500);
            
            e.clearSelection();
        });
        
        clipboard.on('error', function(e) {
            showNotification('Failed to copy text. Please try again.', 'error');
        });
    }
    
    // Tool filtering
    const toolFilterBtns = document.querySelectorAll('.tools-filters .filter-btn');
    const toolCardElements = document.querySelectorAll('.tool-card');
    
    if (toolFilterBtns.length > 0 && toolCardElements.length > 0) {
        toolFilterBtns.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                toolFilterBtns.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                toolCardElements.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Command category filtering
    const commandCategoryBtns = document.querySelectorAll('.command-categories .category-btn');
    const commandCategories = document.querySelectorAll('.command-category');
    
    if (commandCategoryBtns.length > 0 && commandCategories.length > 0) {
        commandCategoryBtns.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                commandCategoryBtns.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const categoryValue = this.getAttribute('data-category');
                
                commandCategories.forEach(category => {
                    if (categoryValue === 'all' || category.getAttribute('data-category') === categoryValue) {
                        category.style.display = 'block';
                    } else {
                        category.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Command search functionality
    const commandSearch = document.getElementById('command-search');
    const commandItems = document.querySelectorAll('.command-item');
    
    if (commandSearch && commandItems.length > 0) {
        commandSearch.addEventListener('input', function() {
            const searchValue = this.value.toLowerCase().trim();
            
            commandItems.forEach(item => {
                const commandText = item.textContent.toLowerCase();
                
                if (commandText.includes(searchValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Show/hide categories based on visible items
            commandCategories.forEach(category => {
                const visibleItems = category.querySelectorAll('.command-item[style*="display: block"]');
                if (visibleItems.length > 0) {
                    category.style.display = 'block';
                } else {
                    category.style.display = 'none';
                }
            });
            
            // If active category is now empty, switch to "All"
            const activeBtn = document.querySelector('.command-categories .category-btn.active');
            if (activeBtn && activeBtn.getAttribute('data-category') !== 'all') {
                const activeCategoryItems = document.querySelectorAll(`.command-category[data-category="${activeBtn.getAttribute('data-category')}"] .command-item[style*="display: block"]`);
                if (activeCategoryItems.length === 0) {
                    document.querySelector('.command-categories .category-btn[data-category="all"]').click();
                }
            }
        });
    }
    
    // Tutorial filtering
    const tutorialFilterBtns = document.querySelectorAll('.tutorials-filters .filter-btn');
    const tutorialCardElements = document.querySelectorAll('.tutorial-card');
    
    if (tutorialFilterBtns.length > 0 && tutorialCardElements.length > 0) {
        tutorialFilterBtns.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                tutorialFilterBtns.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                tutorialCardElements.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Testimonial slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    const prevButton = document.querySelector('.prev-testimonial');
    const nextButton = document.querySelector('.next-testimonial');
    
    if (testimonials.length > 0) {
        let currentTestimonial = 0;
        let testimonialInterval;
        
        function showTestimonial(index) {
            // Hide all testimonials
            testimonials.forEach(testimonial => {
                testimonial.style.display = 'none';
            });
            
            // Remove active class from all dots
            dots.forEach(dot => {
                dot.classList.remove('active');
            });
            
            // Show the selected testimonial
            testimonials[index].style.display = 'block';
            
            // Add active class to current dot
            dots[index].classList.add('active');
        }
        
        function startAutoSlide() {
            testimonialInterval = setInterval(function() {
                currentTestimonial = (currentTestimonial + 1) % testimonials.length;
                showTestimonial(currentTestimonial);
            }, 5000);
        }
        
        function stopAutoSlide() {
            clearInterval(testimonialInterval);
        }
        
        // Initialize testimonials
        showTestimonial(currentTestimonial);
        startAutoSlide();
        
        // Next button event
        if (nextButton) {
            nextButton.addEventListener('click', function() {
                stopAutoSlide();
                currentTestimonial = (currentTestimonial + 1) % testimonials.length;
                showTestimonial(currentTestimonial);
                startAutoSlide();
            });
        }
        
        // Previous button event
        if (prevButton) {
            prevButton.addEventListener('click', function() {
                stopAutoSlide();
                currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
                showTestimonial(currentTestimonial);
                startAutoSlide();
            });
        }
        
        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                stopAutoSlide();
                currentTestimonial = index;
                showTestimonial(currentTestimonial);
                startAutoSlide();
            });
        });
        
        // Pause auto-slide when hovering over testimonial
        testimonials.forEach(testimonial => {
            testimonial.addEventListener('mouseenter', stopAutoSlide);
            testimonial.addEventListener('mouseleave', startAutoSlide);
        });
    }
    
    // Back to top button
    const backToTopButton = document.getElementById('back-to-top-btn');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.style.display = 'flex';
            } else {
                backToTopButton.style.display = 'none';
            }
        });
        
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
        // Login modal functionality
        const loginButtons = document.querySelectorAll('.login-btn');
        const loginModal = document.getElementById('login-modal');
        const closeModalButton = document.querySelector('.close-modal');
        const loginForm = document.getElementById('login-form');
        
        if (loginButtons.length > 0 && loginModal) {
            loginButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    loginModal.style.display = 'flex';
                    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
                });
            });
            
            if (closeModalButton) {
                closeModalButton.addEventListener('click', function() {
                    loginModal.style.display = 'none';
                    document.body.style.overflow = ''; // Re-enable scrolling
                });
            }
            
            window.addEventListener('click', function(e) {
                if (e.target === loginModal) {
                    loginModal.style.display = 'none';
                    document.body.style.overflow = ''; // Re-enable scrolling
                }
            });
            
            if (loginForm) {
                loginForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    const username = document.getElementById('username').value;
                    const password = document.getElementById('password').value;
                    
                    if (username.trim() !== '' && password.trim() !== '') {
                        // Here you would typically send the login data to a server
                        // For demo purposes, just show a success message
                        showNotification('Login successful! Redirecting...', 'success');
                        
                        // Close the modal
                        setTimeout(() => {
                            loginModal.style.display = 'none';
                            document.body.style.overflow = '';
                            loginForm.reset();
                        }, 1500);
                    } else {
                        showNotification('Please enter both username and password.', 'error');
                    }
                });
            }
        }
        
        // Theme toggle functionality
        const themeToggleBtn = document.getElementById('theme-toggle-btn');
        const htmlElement = document.documentElement;
        
        if (themeToggleBtn) {
            // Check for saved theme preference or system preference
            const savedTheme = localStorage.getItem('theme');
            
            if (savedTheme) {
                htmlElement.setAttribute('data-theme', savedTheme);
            } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                // If no saved preference, use system preference
                htmlElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }
            
            themeToggleBtn.addEventListener('click', function() {
                const currentTheme = htmlElement.getAttribute('data-theme') || 'light';
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                
                htmlElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                
                // Optional: add a transition effect
                document.body.classList.add('theme-transition');
                setTimeout(() => {
                    document.body.classList.remove('theme-transition');
                }, 500);
            });
        }
        
        // View more tools button functionality
        const viewMoreToolsBtn = document.getElementById('view-more-tools');
        const toolsGrid = document.querySelector('.tools-grid');
        
        if (viewMoreToolsBtn && toolsGrid) {
            // Initially hide tools beyond the first 6
            const allTools = toolsGrid.querySelectorAll('.tool-card');
            if (allTools.length > 6) {
                for (let i = 6; i < allTools.length; i++) {
                    allTools[i].classList.add('hidden-tool');
                }
                
                viewMoreToolsBtn.addEventListener('click', function() {
                    const hiddenTools = toolsGrid.querySelectorAll('.hidden-tool');
                    
                    if (hiddenTools.length > 0) {
                        // Show hidden tools
                        hiddenTools.forEach(tool => {
                            tool.classList.remove('hidden-tool');
                            tool.classList.add('showing-tool');
                        });
                        this.textContent = 'Show Less';
                    } else {
                        // Hide tools beyond the first 6 again
                        const showingTools = toolsGrid.querySelectorAll('.showing-tool');
                        showingTools.forEach(tool => {
                            tool.classList.add('hidden-tool');
                            tool.classList.remove('showing-tool');
                        });
                        this.textContent = 'View More Tools';
                        
                        // Scroll back to tools section
                        document.querySelector('#tools').scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            } else {
                // Hide the button if there are 6 or fewer tools
                viewMoreToolsBtn.style.display = 'none';
            }
        }
        
        // Search functionality in the navigation
        const searchInput = document.getElementById('search-input');
        const searchBtn = document.getElementById('search-btn');
        
        if (searchInput && searchBtn) {
            searchBtn.addEventListener('click', performSearch);
            searchInput.addEventListener('keyup', function(e) {
                if (e.key === 'Enter') {
                    performSearch();
                }
            });
            
            function performSearch() {
                const searchTerm = searchInput.value.toLowerCase().trim();
                
                if (searchTerm === '') {
                    showNotification('Please enter a search term', 'error');
                    return;
                }
                
                // Collect all searchable content
                const toolCards = document.querySelectorAll('.tool-card');
                const commandItems = document.querySelectorAll('.command-item');
                const tutorialCards = document.querySelectorAll('.tutorial-card');
                
                let toolResults = 0, commandResults = 0, tutorialResults = 0;
                
                // Search through tools
                toolCards.forEach(card => {
                    if (card.textContent.toLowerCase().includes(searchTerm)) {
                        card.classList.add('search-highlight');
                        toolResults++;
                    }
                });
                
                // Search through commands
                commandItems.forEach(item => {
                    if (item.textContent.toLowerCase().includes(searchTerm)) {
                        item.classList.add('search-highlight');
                        commandResults++;
                    }
                });
                
                // Search through tutorials
                tutorialCards.forEach(card => {
                    if (card.textContent.toLowerCase().includes(searchTerm)) {
                        card.classList.add('search-highlight');
                        tutorialResults++;
                    }
                });
                
                // Display search results
                const totalResults = toolResults + commandResults + tutorialResults;
                
                if (totalResults > 0) {
                    showNotification(`Found ${totalResults} results for "${searchTerm}"`, 'success');
                    
                    // Scroll to first result
                    const firstResult = document.querySelector('.search-highlight');
                    if (firstResult) {
                        setTimeout(() => {
                            firstResult.scrollIntoView({
                                behavior: 'smooth',
                                block: 'center'
                            });
                        }, 300);
                    }
                    
                    // Create floating search results panel
                    showSearchResults(searchTerm, {
                        tools: toolResults,
                        commands: commandResults,
                        tutorials: tutorialResults
                    });
                    
                    // Remove highlights after 5 seconds
                    setTimeout(() => {
                        document.querySelectorAll('.search-highlight').forEach(el => {
                            el.classList.remove('search-highlight');
                        });
                    }, 5000);
                } else {
                    showNotification(`No results found for "${searchTerm}"`, 'error');
                }
                
                // Clear search input
                searchInput.value = '';
            }
            
            function showSearchResults(term, results) {
                // Remove any existing results panel
                const existingPanel = document.querySelector('.search-results-panel');
                if (existingPanel) {
                    existingPanel.remove();
                }
                
                // Create panel
                const panel = document.createElement('div');
                panel.className = 'search-results-panel';
                
                panel.innerHTML = `
                    <div class="search-results-header">
                        <h3>Results for "${term}"</h3>
                        <button class="close-results">&times;</button>
                    </div>
                    <div class="search-results-content">
                        <p>${results.tools} tools found</p>
                        <p>${results.commands} commands found</p>
                        <p>${results.tutorials} tutorials found</p>
                    </div>
                    <div class="search-results-actions">
                        <button class="btn primary-btn goto-results">Show Results</button>
                    </div>
                `;
                
                document.body.appendChild(panel);
                
                // Add event listeners
                panel.querySelector('.close-results').addEventListener('click', () => {
                    panel.remove();
                });
                
                panel.querySelector('.goto-results').addEventListener('click', () => {
                    const firstResult = document.querySelector('.search-highlight');
                    if (firstResult) {
                        firstResult.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                    }
                    panel.remove();
                });
                
                // Auto-remove after 10 seconds
                setTimeout(() => {
                    if (document.body.contains(panel)) {
                        panel.classList.add('fade-out');
                        setTimeout(() => {
                            if (document.body.contains(panel)) {
                                panel.remove();
                            }
                        }, 300);
                    }
                }, 10000);
            }
        }
        
        // Challenge completion tracking
        const challengeButtons = document.querySelectorAll('.challenge-card .btn');
        let completedChallenges = JSON.parse(localStorage.getItem('completedChallenges') || '[]');
        
        if (challengeButtons.length > 0) {
            // Update UI based on saved completion data
            updateChallengeUI();
            
            challengeButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    if (button.classList.contains('disabled')) {
                        return;
                    }
                    
                    const challengeCard = this.closest('.challenge-card');
                    const challengeTitle = challengeCard.querySelector('h3').textContent;
                    const statusElement = challengeCard.querySelector('.completion-status');
                    
                    if (statusElement.classList.contains('incomplete')) {
                        // Start challenge
                        statusElement.innerHTML = '<i class="fas fa-spinner"></i> In Progress';
                        statusElement.classList.remove('incomplete');
                        statusElement.classList.add('in-progress');
                        button.textContent = 'Continue';
                        
                        // Save progress
                        if (!completedChallenges.includes(challengeTitle + '-started')) {
                            completedChallenges.push(challengeTitle + '-started');
                            localStorage.setItem('completedChallenges', JSON.stringify(completedChallenges));
                        }
                    } 
                    else if (statusElement.classList.contains('in-progress')) {
                        // Complete challenge (this would typically happen after completing the actual challenge)
                        // For demo purposes, we'll just mark it as completed when clicked again
                        statusElement.innerHTML = '<i class="fas fa-check-circle"></i> Completed';
                        statusElement.classList.remove('in-progress');
                        statusElement.classList.add('completed');
                        button.textContent = 'Details';
                        
                        // Save completion
                        if (!completedChallenges.includes(challengeTitle)) {
                            completedChallenges = completedChallenges.filter(c => c !== challengeTitle + '-started');
                            completedChallenges.push(challengeTitle);
                            localStorage.setItem('completedChallenges', JSON.stringify(completedChallenges));
                            updateLeaderboard();
                            showNotification('Challenge completed! Points added to your score.', 'success');
                        }
                    }
                });
            });
        }
        
        function updateChallengeUI() {
            document.querySelectorAll('.challenge-card').forEach(card => {
                const title = card.querySelector('h3').textContent;
                const statusElement = card.querySelector('.completion-status');
                const button = card.querySelector('.btn');
                
                if (completedChallenges.includes(title)) {
                    // Challenge is completed
                    statusElement.innerHTML = '<i class="fas fa-check-circle"></i> Completed';
                    statusElement.classList.remove('incomplete', 'in-progress');
                    statusElement.classList.add('completed');
                    button.textContent = 'Details';
                } 
                else if (completedChallenges.includes(title + '-started')) {
                    // Challenge is in progress
                    statusElement.innerHTML = '<i class="fas fa-spinner"></i> In Progress';
                    statusElement.classList.remove('incomplete');
                    statusElement.classList.add('in-progress');
                    button.textContent = 'Continue';
                }
            });
        }
        
        function updateLeaderboard() {
            // Update user's score in the leaderboard
            const userRow = document.querySelector('.leaderboard-row.current-user');
            if (userRow) {
                const challengesCell = userRow.querySelector('.challenges');
                const pointsCell = userRow.querySelector('.points');
                
                // Count completed challenges (not including "-started" ones)
                const completedCount = completedChallenges.filter(c => !c.endsWith('-started')).length;
                
                // Update the UI
                const totalChallenges = document.querySelectorAll('.challenge-card').length;
                challengesCell.textContent = `${completedCount}/${totalChallenges}`;
                
                // Calculate points (for demo purposes, 50 points per challenge)
                const points = completedCount * 50;
                pointsCell.textContent = points;
                
                // Animate the change
                pointsCell.classList.add('points-updated');
                setTimeout(() => {
                    pointsCell.classList.remove('points-updated');
                }, 1500);
            }
        }
        
        // Progress tracking for tutorials
        const tutorialLinks = document.querySelectorAll('.tutorial-card .btn');
        let completedTutorials = JSON.parse(localStorage.getItem('completedTutorials') || '[]');
        
        if (tutorialLinks.length > 0) {
            // Update progress bar based on completed tutorials
            updateTutorialProgress();
            
            tutorialLinks.forEach(link => {
                link.addEventListener('click', function() {
                    const tutorialCard = this.closest('.tutorial-card');
                    const tutorialTitle = tutorialCard.querySelector('h3').textContent;
                    
                    // Mark as viewed/in progress when clicking
                    if (!completedTutorials.includes(tutorialTitle)) {
                        completedTutorials.push(tutorialTitle);
                        localStorage.setItem('completedTutorials', JSON.stringify(completedTutorials));
                        updateTutorialProgress();
                    }
                });
            });
        }
        
        function updateTutorialProgress() {
            const progressBar = document.querySelector('.progress-fill');
            const progressText = document.querySelector('.progress-text');
            const continueText = document.querySelector('.tutorial-progress p');
            
            if (progressBar && progressText) {
                const totalTutorials = document.querySelectorAll('.tutorial-card').length;
                const completedCount = completedTutorials.length;
                
                // Calculate percentage
                const percentage = totalTutorials > 0 ? Math.round((completedCount / totalTutorials) * 100) : 0;
                
                // Update UI
                progressBar.style.width = `${percentage}%`;
                progressText.textContent = `${percentage}% Complete`;
                
                // Update continue text if available
                if (continueText && completedTutorials.length > 0) {
                    const lastTutorial = completedTutorials[completedTutorials.length - 1];
                    continueText.innerHTML = `Continue where you left off: <a href="#${lastTutorial.toLowerCase().replace(/\s+/g, '-')}-tutorial">${lastTutorial}</a>`;
                }
            }
        }
        
        // Initialize custom event listeners for tool cards
        document.querySelectorAll('.tool-card .tool-btn').forEach(button => {
            button.addEventListener('click', function(e) {
                // Track tool interactions
                const toolName = this.closest('.tool-card').querySelector('h3').textContent;
                trackInteraction('tool_click', toolName);
            });
        });
        
        // Track user interactions for analytics
        function trackInteraction(action, label) {
            // This would typically send data to an analytics service
            // For now, just log to console and store locally
            console.log(`User interaction: ${action} - ${label}`);
            
            // Store in local storage for demo purposes
            const interactions = JSON.parse(localStorage.getItem('userInteractions') || '[]');
            interactions.push({
                action: action,
                label: label,
                timestamp: new Date().toISOString()
            });
            
            // Keep only the last 100 interactions
            if (interactions.length > 100) {
                interactions.shift();
            }
            
            localStorage.setItem('userInteractions', JSON.stringify(interactions));
            
            // Update recommended content based on interactions
            updateRecommendations();
        }
        
        // Update recommended content based on user behavior
        function updateRecommendations() {
            // This would typically use an algorithm to recommend content
            // For demo purposes, just use the most recent interactions
            const interactions = JSON.parse(localStorage.getItem('userInteractions') || '[]');
            
            if (interactions.length > 0) {
                // Get the last 5 unique tools/tutorials viewed
                const recentItems = [];
                for (let i = interactions.length - 1; i >= 0 && recentItems.length < 5; i--) {
                    const item = interactions[i];
                    if ((item.action === 'tool_click' || item.action === 'tutorial_click') && !recentItems.includes(item.label)) {
                        recentItems.push(item.label);
                    }
                }
                
                // In a real application, you would update a recommendations section here
                console.log('Recommended items based on activity:', recentItems);
            }
        }
        
        // Initialize tool details navigation
        const toolDetailSections = document.querySelectorAll('.tool-detail');
        
        if (toolDetailSections.length > 0) {
            // Hide all tool detail sections initially
            toolDetailSections.forEach(section => {
                if (!window.location.hash || !window.location.hash.includes(section.id)) {
                    section.style.display = 'none';
                }
            });
            
            // Show the section if directly navigated to via URL hash
            if (window.location.hash && document.querySelector(window.location.hash)) {
                const targetSection = document.querySelector(window.location.hash);
                if (targetSection.classList.contains('tool-detail')) {
                    targetSection.style.display = 'block';
                }
            }
            
            // Add event listeners to tool "Learn More" buttons
            document.querySelectorAll('.tool-btn').forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        // Hide all tool detail sections
                        toolDetailSections.forEach(section => {
                            section.style.display = 'none';
                        });
                        
                        // Show the target section
                        targetSection.style.display = 'block';
                        
                        // Scroll to the section
                        window.scrollTo({
                            top: targetSection.offsetTop - 80,
                            behavior: 'smooth'
                        });
                        
                        // Update URL hash (without scrolling, which is handled manually above)
                        history.pushState(null, null, targetId);
                    }
                });
            });
            
            // Handle "Back to Tools" buttons
            document.querySelectorAll('.back-button a').forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Hide the current tool detail section
                    const currentSection = this.closest('.tool-detail');
                    currentSection.style.display = 'none';
                    
                    // Navigate to tools section
                    const targetId = this.getAttribute('href');
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        window.scrollTo({
                            top: targetSection.offsetTop - 80,
                            behavior: 'smooth'
                        });
                        
                        // Update URL hash
                        history.pushState(null, null, targetId);
                    }
                });
            });
        }
        
        // Handle hash changes to navigate between sections
        window.addEventListener('hashchange', function() {
            if (window.location.hash) {
                const targetElement = document.querySelector(window.location.hash);
                
                if (targetElement) {
                    // Handle tool detail sections specially
                    if (targetElement.classList.contains('tool-detail')) {
                        // Hide all tool detail sections
                        toolDetailSections.forEach(section => {
                            section.style.display = 'none';
                        });
                        
                        // Show the target section
                        targetElement.style.display = 'block';
                    }
                    
                    // Scroll to the target element
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
        
        // Add hover effect to command examples (reveals copy button)
        document.querySelectorAll('.command-example').forEach(example => {
            const copyBtn = example.querySelector('.copy-btn');
            
            if (copyBtn) {
                example.addEventListener('mouseenter', function() {
                    copyBtn.style.opacity = '1';
                });
                
                example.addEventListener('mouseleave', function() {
                    if (!copyBtn.classList.contains('copied')) {
                        copyBtn.style.opacity = '0.5';
                    }
                });
            }
        });
        
        // Implement search suggestion dropdown
        const searchInput = document.getElementById('search-input');
        
        if (searchInput) {
            // Create suggestion container
            const suggestionContainer = document.createElement('div');
            suggestionContainer.className = 'search-suggestions';
            searchInput.parentNode.appendChild(suggestionContainer);
            
            // Hide suggestions initially
            suggestionContainer.style.display = 'none';
            
            // Common search terms in Kali Linux context
            const commonSearchTerms = [
                'nmap', 'metasploit', 'burp suite', 'wireshark', 'aircrack-ng',
                'sqlmap', 'hydra', 'john the ripper', 'nikto', 'dirb',
                'recon', 'enumeration', 'password cracking', 'web security',
                'exploitation', 'wireless', 'social engineering', 'reverse shell'
            ];
            
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase().trim();
                
                if (searchTerm.length < 2) {
                    suggestionContainer.style.display = 'none';
                    return;
                }
                
                // Filter matching terms
                const matchingTerms = commonSearchTerms.filter(term => 
                    term.toLowerCase().includes(searchTerm)
                ).slice(0, 5); // Limit to 5 suggestions
                
                if (matchingTerms.length > 0) {
                    // Create suggestion elements
                    suggestionContainer.innerHTML = '';
                    matchingTerms.forEach(term => {
                        const suggestion = document.createElement('div');
                        suggestion.className = 'search-suggestion';
                        suggestion.textContent = term;
                        
                        suggestion.addEventListener('click', function() {
                            searchInput.value = term;
                            suggestionContainer.style.display = 'none';
                            
                            // Trigger search
                            document.getElementById('search-btn').click();
                        });
                        
                        suggestionContainer.appendChild(suggestion);
                    });
                    
                    suggestionContainer.style.display = 'block';
                } else {
                    suggestionContainer.style.display = 'none';
                }
            });
            
            // Hide suggestions when clicking outside
            document.addEventListener('click', function(e) {
                if (!searchInput.contains(e.target) && !suggestionContainer.contains(e.target)) {
                    suggestionContainer.style.display = 'none';
                }
            });
            
            // Hide suggestions when search input loses focus
            searchInput.addEventListener('blur', function(e) {
                // Small delay to allow clicking on suggestions
                setTimeout(() => {
                    if (!suggestionContainer.contains(document.activeElement)) {
                        suggestionContainer.style.display = 'none';
                    }
                }, 100);
            });
        }
    });
    