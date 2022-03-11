export const fetchToken = async () => {
  const API_TOKEN = 'https://opentdb.com/api_token.php?command=request';
  const data = await fetch(API_TOKEN);
  const result = await data.json();
  return result.token;
};

export const fetchQuestions = async (token) => {
  const API_QUESTION = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const dataQuestions = await fetch(API_QUESTION);
  const resultQuestions = await dataQuestions.json();
  return resultQuestions.results;
};
