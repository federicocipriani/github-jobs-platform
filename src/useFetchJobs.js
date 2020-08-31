import { useReducer, useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

// require('dotenv').config();

const ACTIONS = {
    MAKE_REQUEST: 'make-request',
    GET_DATA: 'get-data',
    ERROR: 'error',
    UPDATE_HAS_NEXT_PAGE: 'update-has-next-page',
};

// https://cors-anywhere.herokuapp.com/
// 'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json'
// const BASE_URL =
//     'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json';
var BASE_URL =
    'https://api.allorigins.win/raw?url=https://jobs.github.com/positions.json';
// console.log(BASE_URL);

function reducer(state, action) {
    switch (action.type) {
        // case ACTIONS.MAKE_REQUEST:
        //     // return { loading: true, jobs: [] };
        //     return { loading: true};
        case ACTIONS.GET_DATA:
            return {
                ...state,
                loading: false,
                jobs: action.payload.jobs,
                locations: action.payload.locations,
            };
        case ACTIONS.ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                jobs: [],
            };
        case ACTIONS.UPDATE_HAS_NEXT_PAGE:
            return {
                ...state,
                hasNextPage: action.payload.hasNextPage,
            };
        default:
            return state;
    }
}

function useFetchJobs(filters, page) {
    console.log('----------------');
    console.log('Fetching function');
    const [state, dispatch] = useReducer(reducer, {
        jobs: [],
        locations: [],
        loading: true,
    });
    const [updateUrl, setUpdateUrl] = useState(false);

    // useEffect(() => {
    //     dispatch({ type: ACTIONS.MAKE_REQUEST });

    //     // Retrieve all jobs from GitHub API
    //     fetch('/api/jobs', {
    //         params: { markdown: true, page: page, ...params },
    //     })
    //         .then((res) => {
    //             if (!res.ok) throw Error(res.statusText);
    //             return res.json();
    //         })
    //         .then((json) => {
    //             dispatch({
    //                 type: ACTIONS.GET_DATA,
    //                 payload: { jobs: json.jobs },
    //             });
    //         })
    //         .catch((e) => {
    //             dispatch({ type: ACTIONS.ERROR, payload: { error: e } });
    //         });
    // }, [params, page]);

    useEffect(() => {
        let i;
        console.log(Object.keys(filters).length);
        var HEAD_URL,
            SEARCH_URL = BASE_URL;
        // var SEARCH_URL;
        if (Object.keys(filters).length > 0) {
            for (i = 0; i < Object.keys(filters).length; i++) {
                if (i === 0) {
                    if (Object.keys(filters)[i] === 'location') {
                        HEAD_URL = `${BASE_URL}?${Object.keys(filters)[i]}=${
                            filters[Object.keys(filters)[i]]
                        }`;
                    } else if (Object.keys(filters)[i] === 'description') {
                        HEAD_URL = `${BASE_URL}?${Object.keys(filters)[i]}=${
                            filters[Object.keys(filters)[i]]
                        }`;
                    }
                    SEARCH_URL = HEAD_URL;
                    // else {
                    //     if (Object.keys(filters)[i] === 'location') {
                    //         SEARCH_URL = `${BASE_URL}?${Object.keys(filters)[i]}=${
                    //             filters[Object.keys(filters)[i]]
                    //         }`;
                    //     }
                    //     else if (Object.keys(filters)[i] === 'description') {
                    //         SEARCH_URL = `${BASE_URL}?${Object.keys(filters)[i]}=${
                    //             filters[Object.keys(filters)[i]]
                    //         }`;
                    // }
                } else {
                    if (Object.keys(filters)[i] === 'location') {
                        SEARCH_URL = `${HEAD_URL}&${Object.keys(filters)[i]}=${
                            filters[Object.keys(filters)[i]]
                        }`;
                    } else if (Object.keys(filters)[i] === 'description') {
                        SEARCH_URL = `${HEAD_URL}&${Object.keys(filters)[i]}=${
                            filters[Object.keys(filters)[i]]
                        }`;
                    }
                }
            }
            console.log(BASE_URL);
            console.log(SEARCH_URL);
        }
        // if (Object.keys(filters).length > 0) {
        //     for (i = 0; i < Object.keys(filters).length; i++) {
        //         console.log(BASE_URL.includes(Object.keys(filters)[i]));
        //         if (i === 0 && !BASE_URL.includes(Object.keys(filters)[i])) {
        //             BASE_URL += `?${Object.keys(filters)[i]}=${
        //                 filters[Object.keys(filters)[i]]
        //             }`;
        //             console.log(BASE_URL);
        //         } else if (
        //             i > 0 &&
        //             !BASE_URL.includes(Object.keys(filters)[i])
        //         ) {
        //             BASE_URL += `&${Object.keys(filters)[i]}=${
        //                 filters[Object.keys(filters)[i]]
        //             }`;
        //             console.log(BASE_URL);
        //         }
        //     }
        // }

        const cancelToken1 = axios.CancelToken.source();
        const cancelToken2 = axios.CancelToken.source();

        // dispatch({ type: ACTIONS.MAKE_REQUEST });

        // Retrieve all jobs from GitHub API
        axios
            .get(SEARCH_URL)
            // axios({
            //     method: 'get',
            //     url: BASE_URL,
            //     params: { location: 'Amsterdam' },
            // })
            // axios({ method: 'get', url: BASE_URL, params: { ...filters } })
            .then((res) => {
                console.log(res.data);
                // var loc = [];
                // res.data.map((item) => {
                //     if (!loc.includes(item.location)) {
                //         loc.push(item.location);
                //     }
                // });
                // loc.sort();
                if (Object.keys(filters).length === 0) {
                    var loc = res.data.map((item) => item.location);
                    loc = [...new Set(loc)];
                    loc.sort();
                }

                dispatch({
                    type: ACTIONS.GET_DATA,
                    payload: { jobs: res.data, locations: loc },
                });
            })
            .catch((e) => {
                if (axios.isCancel(e)) return;
                dispatch({ type: ACTIONS.ERROR, payload: { error: e } });
            });

        // Check if there is an additional page
        // axios
        //     .get(BASE_URL, {
        //         cancelToken: cancelToken2.token,
        //         params: { markdown: true, page: page + 1, ...params },
        //     })
        //     .then((res) => {
        //         dispatch({
        //             type: ACTIONS.UPDATE_HAS_NEXT_PAGE,
        //             payload: { hasNextPage: res.data.length !== 0 },
        //         });
        //     })
        //     .catch((e) => {
        //         if (axios.isCancel(e)) return;
        //         dispatch({ type: ACTIONS.ERROR, payload: { error: e } });
        //     });

        return () => {
            cancelToken1.cancel();
            cancelToken2.cancel();
        };
    }, [filters, page]);
    return state;
}

export default useFetchJobs;
