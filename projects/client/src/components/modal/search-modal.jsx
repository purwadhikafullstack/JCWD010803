import Select from "react-select";
import axios from "axios";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from 'react-date-range';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const SearchModal = ({ open, setOpen }) => {

	const navigate = useNavigate()
	const [page, setPage] = useState(1)
	const [category, setCategory] = useState([])
	const [idCategory, setIdCategory] = useState("")
	const getCategories = async () => {
		try {
			const response = await axios.get(`http://localhost:8000/api/properties/allCategories`)
			setCategory(response.data)
		} catch (error) {
			console.log(error);
		}
	}

	const nextPage = () => {
		setPage((prevPage) => Math.max(+prevPage + 1));
	};

	const prevPage = () => {
		setPage((prevPage) => Math.max(+prevPage - 1));
	};

	const handleCloseModal = () => {
		setOpen(false)
	};

	const today = new Date();
	const tomorrow = new Date();
	tomorrow.setDate(today.getDate() + 1);

	const [state, setState] = useState([
		{
			startDate: today,
			endDate: tomorrow,
			key: 'selection'
		}
	]);

	const [startDate, setStartDate] = useState(state[0].startDate)
	const [endDate, setendDate] = useState(state[0].endDate)

	const handleSearch = () => {
		navigate(`/properties?categoryId=${idCategory}&checkIn=${startDate}&checkOut=${endDate}`)
		setOpen(false)
	}

	useEffect(() => {
		getCategories()
	}, [])

	return (
		<div>
			<div className={`w-full justify-center z-40 ${open ? "flex" : "hidden"}`}>
				<div className="w-full flex justify-center h-screen bg-black z-50 fixed bg-opacity-70">
					<div className=" w-full h-screen p-5 z-50 md:w-1/3 md:rounded-xl shadow-md md:h-3/4 my-auto bg-white">
						<div className="cursor-pointer w-fit" onClick={handleCloseModal}>X</div>
						<div className="justify-center flex">
							<div className="w-full">
								{page === 1 ?
									<div className="w-full pb-5">
										<div className="text-2xl flex justify-center font-thin text-gray-800">set your destination</div>
										<div className="mt-5 px-10">
											<Select
												options={category.map(item => ({
													value: item.id,
													label: item.category,
												}))}
												onChange={(item) => {
													setIdCategory(item.value)
												}}
											/>
										</div>
									</div>
									:
									null
								}
								{page === 2 ?
									<div>
										<div className="text-2xl mt-5 flex justify-center font-thin text-gray-800">
											When do you stay?
										</div>
										<DateRange
											ranges={state}
											onChange={(item) => {
												setStartDate(item.selection.startDate)
												setendDate(item.selection.endDate)
												setState([item.selection]);
											}}
											rangeColors={['#262626']}
											direction="vertical"
											showDateDisplay={false}
											minDate={new Date()}
										/>
									</div>
									:
									null
								}
								<div className="flex gap-5 justify-end px-10 font-thin mt-10">
									{page > 1 ?
										<button onClick={prevPage}>Back</button>
										:
										null
									}
									{page < 2 ?
										<button className=" bg-bgPrimary text-white p-2 rounded-full disabled:bg-teal-200 disabled:cursor-not-allowed disabled:hover:scale-100  hover:scale-105" disabled={!idCategory ? true : false} onClick={nextPage}>Next</button>
										:
										null
									}
									{page === 2 ?
										<div className="flex gap-5">
											<button className=" bg-bgPrimary text-white p-2 rounded-full disabled:bg-teal-200 disabled:cursor-not-allowed" onClick={handleSearch}>Search</button>
										</div>
										:
										null
									}
								</div>
							</div>

						</div>
					</div>
				</div>
			</div>
		</div>
	)
}