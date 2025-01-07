import { environment } from '../../../environments/environment.development';
import { getComments } from './getComments';

const { baseUrl, token } = environment;
const issueId = '123';
const mockComments = [
  { id: 1, body: 'First Comment', user: { login: 'user1' } },
  { id: 2, body: 'Second Comment', user: { login: 'user2' } },
];

describe('ACTION: Get Issue Comments', () => {
  it('Should return a comments array', async () => {
    const url = `${baseUrl}/issues/${issueId}/comments`;
    const response = new Response(JSON.stringify(mockComments), {
      status: 200,
      statusText: 'Ok',
    });

    spyOn(window, 'fetch').and.resolveTo(response);
    await getComments(issueId);

    expect(window.fetch).toHaveBeenCalledOnceWith(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  });

  it('Shoudl return an error', async () => {
    const response = new Response(JSON.stringify(mockComments), {
      status: 400,
      statusText: 'Bad Request',
    });

    spyOn(window, 'fetch').and.resolveTo(response);

    try {
      await getComments(issueId);
    } catch (error) {
      expect(error).toBe(`Can't load issue's comments with id ${issueId}`);
    }
  });
});
