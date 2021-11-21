import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { apiUrlBase, headers } from '../constants';

export type RepositoryType = {
  id: number,
  node_id: string,
  name: string ,
  full_name: string,
  owner: {
    login: string,
    id: number,
  },
  html_url: string,
  description: string,
  url: string,
  disabled: boolean,
  visibility: string,
  pushed_at: string,
  created_at: string,
  updated_at: string,
};

export default function Repository() {
  const params = useParams();
  const { search }= useLocation();
  const queryParams = new URLSearchParams(search);
  const [repo, setRepo] = useState<RepositoryType | null>(null);
  const repoUrl = `${apiUrlBase}/repos/${queryParams.get('owner')}/${queryParams.get('name')}`;

  useEffect(() => {
    fetch(repoUrl, { headers })
      .then(async response => {
        const data = await response.json();

        if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          console.log(`Error Response:`, error);
          return Promise.reject(error);
        }

        setRepo(data);
      })
      .catch(error => {
        console.error(`ERROR`, error);
      });
  }, [params, repoUrl])

  return (
    <main style={{padding: "1rem"}}>
      {repo &&
        <div
          style={{
            margin: "2rem",
          }}
        >
          <div
            style={{
              borderBottom: "solid 1px",
              borderTop: "solid 1px",
            }}
          >
            <h2>Repository Details</h2>
          </div>
          <div>
            <h3>{repo?.full_name} :: {repo?.description}</h3>
            <span>
              <p>
                "{repo?.name}" is a repository owned by <strong>{repo?.owner.login}</strong>.
              </p>
              <p>
                It was created at {repo.created_at} and last updated at {repo.updated_at}.
              </p>
              <p>
                You can&nbsp;
                <a href={repo.html_url} target='_blank' rel='noreferrer'>
                view it on GitHub using this link.
                </a>
              </p>
            </span>
          </div>
        </div>
      }
    </main>
  );
}
