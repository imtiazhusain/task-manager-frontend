import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'



interface FilterProps {

    setFilterValue: (value: string) => void
    filterQuery: {
        status: string, time: string
    }
}


const Filter: React.FC<FilterProps> = ({ setFilterValue, filterQuery }) => {
    return (
        <div className="space-y-2 mb-5">

            <div className=" grid place-content-end">


            </div>
            <div className="grid grid-cols-1 sm:grid-cols-12 md:grid-cols-12 gap-4">





                <div className='sm:col-span-6 md:col-span-3'>

                    <Select onValueChange={setFilterValue}  >
                        <SelectTrigger className="" >
                            <SelectValue placeholder="Search By Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="status:">All</SelectItem>
                            <SelectItem value="status:Complete">Complete</SelectItem>
                            <SelectItem value="status:Incomplete">Incomplete</SelectItem>
                        </SelectContent>
                    </Select>
                </div>


                <div className='sm:col-span-6 md:col-span-3'>

                    <Select onValueChange={setFilterValue}  >
                        <SelectTrigger className="" >
                            <SelectValue placeholder="Search By Time" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="time:Latest">Due Later</SelectItem>
                            <SelectItem value="time:Oldest">Due Soon</SelectItem>
                        </SelectContent>
                    </Select>
                </div>



            </div>
        </div>
    )
}

export default Filter