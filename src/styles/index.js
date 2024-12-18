$(document).ready(function() {
    const questions = [
        {
            question: "What is the capital of France?",
            options: ["London", "Berlin", "Paris", "Rome"],
            correctAnswer: 2,
            value: 500
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Venus", "Mars", "Jupiter", "Saturn"],
            correctAnswer: 1,
            value: 1000
        },
        {
            question: "Who did nigeria get their independent?",
            options: ["1860", "1950", "1960", "1957"],
            correctAnswer: 2,
            value: 2000
        },
        {
            question: "When did nigeria get their independent?",
            options: ["1860", "1950", "1960", "1957"],
            correctAnswer: 2,
            value: 2000
        },
        {
            question: "when was Eagle height founded",
            options: ["1860", "1950", "1960", "2003"],
            correctAnswer: 3,
            value: 500000
        },
        {
            question: "Who did nigeria get their independent?",
            options: ["1860", "1950", "1960", "1957"],
            correctAnswer: 2,
            value: 2000
        },


    ];

    let currentQuestionIndex = 0;
    let currentPrize = 0;

    function startGame() {
        currentQuestionIndex = 0;
        currentPrize = 0;
        
        $('#startScreen').hide();
        $('#questionScreen').show();
        $('#gameOverScreen').hide();
        
        $('.prize-row').removeClass('active');
        $(`[data-prize="500"]`).addClass('active');

        // Enable and reset lifelines
        $('.lifeline-btn').prop('disabled', false).removeClass('opacity-50');
        
        loadQuestion();
    }

    function loadQuestion() {
        const question = questions[currentQuestionIndex];
        
        $('#questionText').text(question.question);
        $('#currentPrize').text(`$${question.value}`);
        
        $('.answer-btn').each(function(index) {
            $(this)
                .text(question.options[index])
                .removeClass('bg-green-500 bg-red-500 text-white')
                .addClass('bg-gray-100')
                .show();
        });
    }

    function checkAnswer(selectedIndex) {
        const question = questions[currentQuestionIndex];
        
        $('.answer-btn').eq(selectedIndex).addClass('bg-red-500 text-white');
        $('.answer-btn').eq(question.correctAnswer).addClass('bg-green-500 text-white');
        
        if (selectedIndex === question.correctAnswer) {
            currentPrize = question.value;
            
            $('.prize-row').removeClass('active');
            $(`[data-prize="${currentPrize}"]`).addClass('active');
            
            setTimeout(() => {
                currentQuestionIndex++;
                if (currentQuestionIndex < questions.length) {
                    loadQuestion();
                } else {
                    gameWon();
                }
            }, 2000);
        } else {
            setTimeout(gameOver, 2000);
        }
    }

    function gameOver() {
        $('#questionScreen').hide();
        $('#gameOverScreen').show();
        $('#finalPrize').text(`You won $${currentPrize}`);
    }

    function gameWon() {
        $('#questionScreen').hide();
        $('#gameOverScreen').show();
        $('#finalPrize').text('Congratulations! You won $1,000,000!');
    }

    function useFiftyFifty() {
        const question = questions[currentQuestionIndex];
        const correctAnswer = question.correctAnswer;
        const wrongAnswers = [0, 1, 2, 3].filter(i => i !== correctAnswer);
        const answersToRemove = wrongAnswers.sort(() => 0.5 - Math.random()).slice(0, 2);
        
        answersToRemove.forEach(index => {
            $('.answer-btn').eq(index).hide();
        });
        
        $('#fiftyFifty').prop('disabled', true).addClass('opacity-50');
    }

    function usePhoneAFriend() {
        const question = questions[currentQuestionIndex];
        const correctAnswer = question.correctAnswer;
        const isCorrect = Math.random() < 0.8;
        const friendAnswer = isCorrect ? correctAnswer : [0, 1, 2, 3].filter(i => i !== correctAnswer)[Math.floor(Math.random() * 3)];
        alert(`Your friend thinks the answer is: ${question.options[friendAnswer]}`);
        $('#phoneAFriend').prop('disabled', true).addClass('opacity-50');
    }

    function useAskAudience() {
        const question = questions[currentQuestionIndex];
        const correctAnswer = question.correctAnswer;
        const audienceVotes = [0, 0, 0, 0];
        audienceVotes[correctAnswer] = Math.floor(Math.random() * 40) + 40;

        const remainingVotes = 100 - audienceVotes[correctAnswer];
        [0, 1, 2, 3].filter(i => i !== correctAnswer).forEach((i, idx, arr) => {
            audienceVotes[i] = idx === arr.length - 1 
                ? remainingVotes - audienceVotes.slice(0, idx).reduce((a, b) => a + b, 0)
                : Math.floor(Math.random() * (remainingVotes / arr.length));
        });

        const audienceResults = question.options.map((option, index) => `${option}: ${audienceVotes[index]}%`).join('\n');
        alert(`Audience Poll Results:\n\n${audienceResults}`);
        $('#askAudience').prop('disabled', true).addClass('opacity-50');
    }

    $('#startGame').on('click', startGame);
    $('#restartGame').on('click', startGame);
    $('.answer-btn').on('click', function() {
        const selectedIndex = $(this).index();
        checkAnswer(selectedIndex);
    });
    $('#fiftyFifty').on('click', useFiftyFifty);
    $('#phoneAFriend').on('click', usePhoneAFriend);
    $('#askAudience').on('click', useAskAudience);
});