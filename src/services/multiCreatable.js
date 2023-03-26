import React from 'react'

import CreatableSelect from 'react-select/creatable';
const options = []

export default ({filterFormChangeHandler}) => <CreatableSelect isMulti options={options} onChange={(selectedValue) => filterFormChangeHandler(selectedValue, 'keywords')}/>;



