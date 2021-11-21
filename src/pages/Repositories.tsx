import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import { apiUrlBase, headers, orgName } from '../constants';
import { RepositoryType } from './Repository';

const resultsPerPage = 30;

const reposListUrl = (pageNum: number): string => (
  `${apiUrlBase}/orgs/${orgName}/repos?type=public&page=${pageNum}&per_page=${resultsPerPage}&sort=full_name`
)

export default function Repositories() {
  const [repos, setRepos] = useState<Array<RepositoryType> | null>(null);
  const [page, setPageNum] = useState<number>(1);

  useEffect(() => {
    fetch(reposListUrl(page), { headers })
      .then(async response => {
        const data = await response.json();

        if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          console.log(`Error Response:`, error);
          return Promise.reject(error);
        }

        setRepos(data)
      })
      .catch(error => {
        console.error(`ERROR`, error);
      });
  }, [page])

  function nextPage() {
    setPageNum((page) => page + 1);
  }

  function previousPage() {
    if (page > 1) {
      setPageNum((page) => page - 1);
    }
  }

  return (
    <>
      <div style={{ padding: "1rem 0" }}>
        <div>
          <h2>GitHub Repositories</h2>
        </div>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                '& .MuiTableCell-root': {
                  fontWeight: 600,
                },
              }}>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Last Updated At</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {repos && repos.map(repo => (
              <TableRow key={repo.id}>
                <TableCell>
                  <NavLink to={`./${repo.id}?name=${repo.name}&owner=${repo.owner.login}`}>
                    {repo.name}
                  </NavLink>
                </TableCell>
                <TableCell>{repo.description}</TableCell>
                <TableCell>{repo.created_at}</TableCell>
                <TableCell>{repo.updated_at}</TableCell>
                <TableCell>
                  <a href={repo.html_url} rel="noreferrer" target='_blank'>
                    View on GitHub
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div style={{ margin: '10px 0' }}>
          <Button onClick={previousPage}>&lt;</Button>
          <TextField
            id="pageNumber"
            disabled={true}
            value={page}
            style={{
              maxHeight: '8px',
              width: '40px',
            }}
          />
          <Button onClick={nextPage}>&gt;</Button>
        </div>
        <Outlet />
      </div>
    </>
  );
}
