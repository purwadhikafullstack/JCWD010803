import { useState } from "react"

export const Sorting = ({sortByProps, sortProps}) => {
    const [sort, setSort] = useState("ASC")
    const [sortBy, setSortBy] = useState("propertyName")

    return (
        <div className="border h-12 items-center text-gray-700 flex justify-between px-10">
            <div class="flex items-center space-x-2">
                <input
                    type="radio"
                    id="1"
                    name="name"
                    value="ASC"
                    class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    onChange={(e) => {setSort("ASC"); setSortBy("propertyName"); sortByProps("propertyName"); sortProps("ASC") }}
                    checked={sort == "ASC" && sortBy == "propertyName" ? true : false}
                />
                <label for="1" class="text-gray-700">A - Z</label>
            </div>
            <div class="flex items-center space-x-2">
                <input
                    type="radio"
                    id="2"
                    name="name"
                    value="DESC"
                    class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    onChange={(e) => {setSort("DESC"); setSortBy("propertyName"); sortByProps("propertyName"); sortProps("DESC")}}
                    checked={sort == "DESC" && sortBy == "propertyName" ? true : false}
                />
                <label for="DESC" class="text-gray-700">Z - A</label>
            </div>
            <div class="flex items-center space-x-2">
                <input
                    type="radio"
                    id="3"
                    name="price"
                    value="DESC"
                    class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    onChange={(e) => {setSort("DESC"); setSortBy("price"); sortByProps("price"); sortProps("DESC")}}
                    checked={sort == "DESC" && sortBy == "price" ? true : false}
                />
                <label for="DESC" class="text-gray-700">Highest price</label>
            </div>
            <div class="flex items-center space-x-2">
                <input
                    type="radio"
                    id="lowest"
                    name="price"
                    value="ASC"
                    class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    onChange={(e) => {setSort("ASC"); setSortBy("price"); sortByProps("price"); sortProps("ASC")}}
                    checked={sort == "ASC" && sortBy == "price" ? true : false}
                />
                <label for="ASC" class="text-gray-700">Lowest price</label>
            </div>
        </div>
    )
}