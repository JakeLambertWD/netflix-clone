import React, { useEffect, useState } from 'react';
import './Row.css';
import axios from './axios';

const Row = ({ title, fetchUrl, isLargeRow = false }) => {
	const [movies, setMovies] = useState([]);

	const base_url = 'https://image.tmdb.org/t/p/original/';

	// this useEffect is dependant on [fetchUrl]
	useEffect(() => {
		async function fetchData() {
			const request = await axios.get(fetchUrl);
			setMovies(request.data.results);
			return request;
		}
		// call func
		fetchData();
	}, [fetchUrl]);

	return (
		<div className='row'>
			<h6>{title}</h6>
			<div className='row__posters'>
				{movies.map(
					movie =>
						// remove broken image tag (dead links)
						((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) && (
							<img
								key={movie.id}
								className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
								src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
								alt={movie.name}
							/>
						)
				)}
			</div>
		</div>
	);
};

export default Row;
