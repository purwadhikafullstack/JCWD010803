export const SortingRoomList = ({sort, sortBy, setSort, setSortBy}) => {
    return(
        <div className='flex w-full md:justify-start justify-center gap-4'>
                    <div class="flex items-center space-x-2 ">
                        <input
                            type="radio"
                            id="1"
                            name="name"
                            value="ASC"
                            class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                            onChange={(e) => { setSort("ASC"); setSortBy("roomName") }}
                            checked={sort == "ASC" && sortBy == "roomName" ? true : false}
                        />
                        <div for="1" class="text-gray-700">A - Z</div>
                    </div>
                    <div class="flex items-center space-x-2">
                        <input
                            type="radio"
                            id="2"
                            name="name"
                            value="DESC"
                            class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                            onChange={(e) => { setSort("DESC"); setSortBy("roomName") }}
                            checked={sort == "DESC" && sortBy == "roomName" ? true : false}
                        />
                        <div for="DESC" class="text-gray-700">Z - A</div>
                    </div>
                    <div class="flex items-center space-x-2">
                        <input
                            type="radio"
                            id="3"
                            name="price"
                            value="DESC"
                            class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                            onChange={(e) => { setSort("DESC"); setSortBy("price") }}
                            checked={sort == "DESC" && sortBy == "price" ? true : false}
                        />
                        <div for="DESC" class="text-gray-700">Highest price</div>
                    </div>
                    <div class="flex items-center space-x-2">
                        <input
                            type="radio"
                            id="lowest"
                            name="price"
                            value="ASC"
                            class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                            onChange={(e) => { setSort("ASC"); setSortBy("price") }}
                            checked={sort == "ASC" && sortBy == "price" ? true : false}
                        />
                        <div for="ASC" class="text-gray-700">Lowest price</div>
                    </div>
                </div>
    )
}