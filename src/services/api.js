const fetchQuestions = async () => {
  const API_TOKEN = 'https://opentdb.com/api_token.php?command=request';
  const data = await fetch(API_TOKEN);
  const result = await data.json();
  const API_QUESTION = `https://opentdb.com/api.php?amount=5&token=${result.token}`;
  const dataQuestions = await fetch(API_QUESTION);
  const resultQuestions = await dataQuestions.json();
  console.log(resultQuestions.results);
  return resultQuestions.results;
};

export default fetchQuestions;
