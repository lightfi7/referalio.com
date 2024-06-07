import { Fragment, useEffect, useState, useContext } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Chip } from "@nextui-org/react";
import { SearchContext } from "@/provider/searchContext";
import { getSearchData } from "@/api";

export default function SearchNiches() {
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [query, setQuery] = useState("");
  const [people, setPeople] = useState([])
  const context = useContext(SearchContext)

  useEffect(() => {
    setSelectedPeople([]);
    getSearchData().then(response => {
      setPeople(response.data.nicheData);
    }).catch(error => {
      console.log(error)
    })
  }, [])
  useEffect(() => {
    context.setSearchParam({ niches: selectedPeople })
  }, [selectedPeople])

  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) =>
        person.name
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(query.toLowerCase().replace(/\s+/g, ""))
      );
  return (
    <div className="block justify-center items-center">
      <p className="pr-10 py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] block text-sm font-medium text-gray-700">Search Niches:</p>
      <div className="w-full">
        <Combobox value={selectedPeople} onChange={setSelectedPeople} multiple>
          <div className="relative px-1">
            <div className="relative">
              <Combobox.Input
                className="block w-full appearance-none rounded-lg pr-10 border border-gray-200 bg-white py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-gray-900 placeholder:text-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm"
                displayValue={(people) =>
                  people.map((person) => person.name).join(", ")
                }
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Combobox.Button>
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery("")}
            >
              <Combobox.Options className="mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {filteredPeople.length === 0 && query !== "" ? (
                  <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                    Nothing found.
                  </div>
                ) : (
                  filteredPeople.map((person) => (
                    <Combobox.Option
                      key={person.id}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-cyan-600 text-white" : "text-gray-900"
                        }`
                      }
                      value={person}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${selected ? "font-medium" : "font-normal"
                              }`}
                          >
                            {person.name}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? "text-white" : "text-teal-600"
                                }`}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
        <div className="pr-10 py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] block text-sm font-medium text-gray-700">Seleced niches:</div>
        <div className='text-sm font-medium text-gray-700 w-[280px]'>
          {selectedPeople.length == 0 ?
            <div className="pr-10 py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] block text-xs text-gray-700">No niches selected.</div> :
            selectedPeople.map((people, index) => (
              <Chip key={index} onClose={() => setSelectedPeople([...selectedPeople.slice(0, index), ...selectedPeople.slice(index + 1)])} size="sm" className="m-[4px]">{people.name}</Chip>
            ))
          }
        </div>
      </div>
    </div >
  );
}