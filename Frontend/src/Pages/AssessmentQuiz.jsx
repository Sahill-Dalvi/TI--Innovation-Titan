import React, { useState, useEffect } from "react";
import {
  Flex,
  Heading,
  Button,
  VStack,
  Image,
  useToast,
} from "@chakra-ui/react";
import QuizSVG from "../Assets/Quiz.svg";
import { useNavigate } from "react-router-dom";

function Quiz() {
  const [questions, setQuestions] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const toast = useToast();

  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      navigate("/login");
    }
    const fetchQuestionsData = async () => {
      // List of  basic interview behavioral questions
      const behavioralQuestions = [
        {
          question:
            "Describe a situation where you had to meet a tight deadline.",
          options: [
            "I excel under pressure and met the deadline successfully.",
            "I struggled a bit but managed to complete the task on time.",
            "I missed the deadline but learned from the experience.",
          ],
          answer: "I excel under pressure and met the deadline successfully.",
        },
        {
          question:
            "Tell me about a time when you had to work in a team to achieve a common goal.",
          options: [
            "I played a key role in the team and we achieved our goal together.",
            "I contributed to the team, but there were some conflicts.",
            "I had difficulty working with others, and we didn't meet our goal.",
          ],
          answer:
            "I played a key role in the team and we achieved our goal together.",
        },
        {
          question:
            "Describe a challenging situation at work and how you handled it.",
          options: [
            "I successfully navigated the challenge and learned valuable lessons.",
            "I found it difficult but managed to handle it with support.",
            "I struggled, and it had a negative impact on my work.",
          ],
          answer:
            "I successfully navigated the challenge and learned valuable lessons.",
        },
        {
          question:
            "How do you prioritize tasks and manage your time effectively?",
          options: [
            "I use a systematic approach and prioritize tasks based on urgency and importance.",
            "I struggle with time management but try my best to meet deadlines.",
            "I often find myself overwhelmed and miss deadlines.",
          ],
          answer:
            "I use a systematic approach and prioritize tasks based on urgency and importance.",
        },
        {
          question:
            "Tell me about a time when you had to adapt to a change in the workplace.",
          options: [
            "I adapted quickly and contributed positively to the change.",
            "I struggled initially but eventually adapted.",
            "I had difficulty adapting, and it affected my performance.",
          ],
          answer: "I adapted quickly and contributed positively to the change.",
        },
      ];

      // Shuffling the questions and select the first 5 for the quiz
      const shuffledQuestions = behavioralQuestions.sort(
        () => Math.random() - 0.5
      );
      const selectedQuestions = shuffledQuestions.slice(0, 5);

      setQuestions(selectedQuestions);
    };

    fetchQuestionsData();
  }, []);

  const showToast = (message, isSuccess) => {
    toast({
      title: message,
      status: isSuccess ? "success" : "error",
      duration: 1500,
      isClosable: true,
    });
  };

  const handleStartQuiz = () => {
    setIsQuizStarted(true);
  };

  const handleAnswerClick = (selectedOption) => {
    const correctAnswer = questions[currentQuestionIndex].answer;

    if (selectedOption === correctAnswer) {
      setScore((prevScore) => prevScore + 1);
      showToast("Correct answer!", true);
    } else {
      showToast("Wrong answer!", false);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setIsQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setIsQuizStarted(false);
    setIsQuizCompleted(false);
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  const getTraits = () => {
    // Based on the user's score, provide some traits
    if (score === questions.length) {
      return "You have demonstrated excellent problem-solving and teamwork skills!";
    } else if (score >= questions.length / 2) {
      return "You have shown competency in handling various work situations.";
    } else {
      return "There are areas for improvement, but you have the potential to grow.";
    }
  };

  return (
    <Flex justifyContent="center" alignItems="center" flexDirection="column">
      {!isQuizStarted ? (
        <>
          <Image
            src={QuizSVG}
            alt="Quiz Image"
            mt="60px"
            boxSize="250px"
            mb="8"
          />
          <Heading mb="8" textAlign="center">
            Welcome to the Behavioral Interview Quiz!
          </Heading>
          <Button onClick={handleStartQuiz} colorScheme="teal" size="lg">
            Start Quiz
          </Button>
        </>
      ) : !isQuizCompleted ? (
        <VStack
          spacing="4"
          direction="column"
          align="center"
          mb="6"
          width="720px"
        >
          <Image src={QuizSVG} alt="Quiz Image" boxSize="150px" mb="2" />
          <Heading textAlign="center" mb="2" fontSize="4xl">
            Question {currentQuestionIndex + 1} of {questions.length}
          </Heading>
          <Heading
            textAlign="center"
            mb="2"
            minBlockSize="100px"
            maxBlockSize="300px"
            fontSize="3xl"
          >
            {questions && questions[currentQuestionIndex].question}
          </Heading>
          {questions &&
            questions[currentQuestionIndex].options &&
            questions[currentQuestionIndex].options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswerClick(option)}
                colorScheme="teal"
                size="md"
                minWidth="100px"
              >
                {option}
              </Button>
            ))}
        </VStack>
      ) : (
        <VStack spacing="4" direction="column" align="center" mt="118" mb="8">
          <Heading as="h1" size="xl" textAlign="center">
            Quiz completed! <br /> Your score: {score} / {questions.length}
          </Heading>
          <Heading as="h2" size="md" textAlign="center" mb="4">
            {getTraits()}
          </Heading>
          <Button onClick={handleRestartQuiz} colorScheme="teal" size="lg">
            Restart Quiz
          </Button>
        </VStack>
      )}
    </Flex>
  );
}

export default Quiz;
