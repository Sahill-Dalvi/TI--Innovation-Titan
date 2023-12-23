import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  Box,
  SimpleGrid,
  Image,
  Text,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Link,
  VStack,
  Heading,
  Flex,
} from "@chakra-ui/react";
import industryNewsImage from "../Assets/news.png";
import salaryTrendsImage from "../Assets/trend.png";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);
const jobTitles = ["backend", "automation", "data analyst"];

const NewsFeed = () => {
  const [articles, setArticles] = useState([]);
  const [techRoles, setTechRoles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      navigate("/login");
    }
    const fetchArticles = async () => {
      try {
        const articlesResponse = await axios.get(
          "https://newsapi.org/v2/everything",
          {
            params: {
              q: "industry trends",
              sortBy: "publishedAt",
              language: "en",
              apiKey: "165638a32907454c8a3cc0136a956e82",
              pageSize: 10,
            },
          }
        );
        const filteredAndLimitedArticles = articlesResponse.data.articles
          .filter((article) => article.urlToImage)
          .slice(0, 6);
        setArticles(filteredAndLimitedArticles);
        fetchTechRoles();
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    const fetchTechRoles = async () => {
      try {
        let roles = [];
        for (const title of jobTitles) {
          const response = await axios.get(
            "https://job-salary-data.p.rapidapi.com/job-salary",
            {
              params: {
                job_title: title,
                location: "new york, usa",
                radius: "200",
              },
              headers: {
                "X-RapidAPI-Key":
                  "145109d698msh151f854496c50dap103a7cjsnc5796c2f12d5",
                "X-RapidAPI-Host": "job-salary-data.p.rapidapi.com",
              },
            }
          );
          roles = roles.concat(response.data.data);
        }
        const uniqueRoles = Array.from(
          new Set(roles.map((a) => a.job_title))
        ).map((job_title) => {
          return roles.find((a) => a.job_title === job_title);
        });
        setTechRoles(uniqueRoles);
      } catch (error) {
        console.error("Error fetching tech roles:", error);
      }
    };

    fetchArticles();
  }, []);

  const openModal = (article) => {
    setSelectedArticle(article);
    onOpen();
  };

  const formatSalary = (salary) => {
    return salary.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const salaryData = techRoles.map((role) => role.median_salary);
  const minSalaryData = techRoles.map((role) => role.min_salary);
  const maxSalaryData = techRoles.map((role) => role.max_salary);
  const labels = techRoles.map((role) => role.job_title);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Median Salary",
        data: salaryData,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const rangeChartData = {
    labels,
    datasets: [
      {
        label: "Min Salary",
        data: minSalaryData,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: false,
      },
      {
        label: "Max Salary",
        data: maxSalaryData,
        borderColor: "rgba(53, 162, 235, 1)",
        backgroundColor: "rgba(53, 162, 235, 0.2)",
        fill: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Tech Role Salary Trends" },
    },
  };

  return (
    <Box p={5}>
      <Center mb={5}>
        <Image
          src={industryNewsImage}
          style={{
            maxWidth: "20%",
            display: "block",
            // marginLeft: "auto",
            // marginRight: "auto",
          }}
          // mr={1}
        />
        <Heading as="h2" size="xl">
          Industry News
        </Heading>
      </Center>
      <Box>
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={10}>
          {articles
            .filter((article) => article.urlToImage) // Filter out articles without images
            .map((article, index) => (
              <Box
                key={index}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                cursor="pointer"
                onClick={() => openModal(article)}
              >
                <Image
                  src={article.urlToImage}
                  alt={`Image for ${article.title}`}
                />
                <Box p={5}>
                  <Text fontWeight="bold">{article.title}</Text>
                </Box>
              </Box>
            ))}
        </SimpleGrid>
      </Box>
      <Center my={5}>
        <Image
          src={industryNewsImage}
          style={{
            maxWidth: "20%",
            display: "block",
            // marginLeft: "auto",
            // marginRight: "auto",
          }}
          // mr={1}
        />
        <Heading as="h2" size="xl">
          Salary Trends
        </Heading>
      </Center>
      <Box>
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={10}>
          {techRoles.map((role, index) => (
            <Box
              key={index}
              p={5}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              bg="white"
              shadow="md"
            >
              <VStack spacing={3} align="start">
                <Text fontSize="lg" fontWeight="bold">
                  {role.job_title}
                </Text>
                <Text>Median Salary: {formatSalary(role.median_salary)}</Text>
                <Text fontSize="sm">Location: {role.location}</Text>
                <Link
                  href={role.publisher_link}
                  color="blue.500"
                  isExternal
                  fontSize="sm"
                >
                  More Info
                </Link>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </Box>

      <Center mt={10}>
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacing={10}
          width="100%"
          px={[5, 10, 15, 20]}
          py={5}
        >
          <Box width="100%" height="300px">
            {" "}
            <Heading mb={5} as="h3" size="md">
              Median Salary Distribution
            </Heading>
            <Bar data={chartData} options={chartOptions} />
          </Box>
          <Box width="100%" height="300px">
            {" "}
            <Heading mb={5} as="h3" size="md">
              Salary Range
            </Heading>
            <Line data={rangeChartData} options={chartOptions} />
          </Box>
        </SimpleGrid>
      </Center>

      {selectedArticle && (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedArticle.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Image
                src={selectedArticle.urlToImage}
                alt={`Image for ${selectedArticle.title}`}
              />
              <Text fontSize="sm" color="black">
                By {selectedArticle.author || "Unknown"} -{" "}
                {selectedArticle.publishedAt.split("T")[0]}
              </Text>
              <Text my={4} color="black">
                {selectedArticle.description}
              </Text>
              <Text color="black">{selectedArticle.content.split("[")[0]}</Text>
              <Center mt={4}>
                <Button
                  as="a"
                  href={selectedArticle.url}
                  target="_blank"
                  colorScheme="blue"
                >
                  Read Full Article
                </Button>
              </Center>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default NewsFeed;
