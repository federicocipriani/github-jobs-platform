import React, { useState } from 'react';
import useFetchJobs from './useFetchJobs';
import { Container, Alert } from 'react-bootstrap';
import Job from './Job';
import JobPagination from './JobPagination';
import SearchForm from './SearchForm';

function App() {
    const [params, setParams] = useState({});
    const [page, setPage] = useState(1);
    // const [show, setShow] = useState(true);

    const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page);

    function handleParamChange(e) {
        const param = e.target.name;
        const value = e.target.value;
        console.log(param);
        console.log(typeof value);
        setPage(1);
        setParams((prevParams) => {
            return { ...prevParams, [param]: value };
        });
    }

    // function turnOffAlert() {
    //     setShow();
    // }

    return (
        <Container className='my-4'>
            <h1 className='mb-4'>GitHub Jobs</h1>
            <SearchForm params={params} onParamChange={handleParamChange} />
            <JobPagination
                page={page}
                setPage={setPage}
                hasNextPage={hasNextPage}
            />
            {loading && <Alert variant='dark'>Loading...</Alert>}
            {error && <Alert variant='danger'>Error. Try refreshing.</Alert>}
            {/* {show && (
                <Alert
                    show={show}
                    onClose={() => setShow()}
                    variant='success'
                    dismissible>
                    <Alert.Heading>Some jobs for you!</Alert.Heading>
                    <p>
                        You can also refine the search with the search box
                        above.
                    </p>
                </Alert>
            )} */}
            {jobs.map((job) => {
                return <Job key={job.id} job={job}></Job>;
            })}
            <JobPagination
                page={page}
                setPage={setPage}
                hasNextPage={hasNextPage}
            />
        </Container>
    );
}

export default App;
