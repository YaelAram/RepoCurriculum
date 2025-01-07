import { environment } from '../../../environments/environment.development';
import { getIssue } from './getIssue';

const { baseUrl, token } = environment;
const issueId = '123';
const issueResp = {
  id: 123,
  name: '# Fake Issue',
};

describe('ACTION: Get Issue By Id', () => {
  it('Should return a GitHub Issue', async () => {
    const url = `${baseUrl}/issues/${issueId}`;
    const response = new Response(JSON.stringify(issueResp), {
      status: 200,
      statusText: 'Ok',
    });

    spyOn(window, 'fetch').and.resolveTo(response);
    await getIssue(issueId);

    expect(window.fetch).toHaveBeenCalledOnceWith(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  });

  it('Should return an Error', async () => {
    const response = new Response(JSON.stringify(issueResp), {
      status: 400,
      statusText: 'Bad Request',
    });

    spyOn(window, 'fetch').and.resolveTo(response);

    try {
      await getIssue(issueId);
    } catch (error) {
      expect(error).toBe(`Can't load issue info with id ${issueId}`);
    }
  });
});
