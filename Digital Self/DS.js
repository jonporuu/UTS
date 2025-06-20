document.addEventListener('DOMContentLoaded', () => {
    const mainMenuToggle = document.getElementById('main-menu-toggle');
    const mainNavTopicsList = document.getElementById('mainNavTopicsList');
    const navLinks = document.querySelectorAll('.main-nav a');
    const topBtn = document.getElementById('topBtn');

    if (mainMenuToggle && mainNavTopicsList) {
        mainMenuToggle.addEventListener('click', () => {
            if (mainNavTopicsList.classList.contains('show')) {
                mainNavTopicsList.classList.remove('show');
                mainNavTopicsList.classList.add('hide');
                document.body.classList.remove('no-scroll');
            } else {
                mainNavTopicsList.classList.remove('hide');
                mainNavTopicsList.classList.add('show');
                document.body.classList.add('no-scroll');
            }
        });

        mainNavTopicsList.addEventListener('animationend', (event) => {
            if (event.animationName === 'slideOutToRight') {
                mainNavTopicsList.style.right = '-260px';
                mainNavTopicsList.style.opacity = '0';
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, 
                    behavior: 'smooth'
                });

                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');

                if (mainNavTopicsList && mainNavTopicsList.classList.contains('show')) {
                    mainNavTopicsList.classList.remove('show');
                    mainNavTopicsList.classList.add('hide');
                    document.body.classList.remove('no-scroll');
                }
            }
        });
    });

    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('.topic');
        let currentActive = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 100 && scrollY < sectionTop + sectionHeight - 100) {
                currentActive = '#' + section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentActive) {
                link.classList.add('active');
            }
        });

        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            topBtn.style.display = 'block';
        } else {
            topBtn.style.display = 'none';
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            mainNavTopicsList.classList.remove('show', 'hide');
            document.body.classList.remove('no-scroll');
            mainNavTopicsList.style.right = '';
            mainNavTopicsList.style.opacity = '';
        }
    });
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function toggleTrivia(element) {
    const triviaContent = element.querySelector('.trivia-content p');
    if (triviaContent) {
        triviaContent.classList.toggle('show');
    }
}


  const animatedImage = document.querySelector('.animated-image');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });

  if (animatedImage) {
    observer.observe(animatedImage);
  }