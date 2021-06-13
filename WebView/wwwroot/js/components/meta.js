
export const baseUrl = 'http://localhost:62951/';
export const services = {
    service: 'service',
    employee: 'employee',
    request: 'request'
}
export const methods = {
    get: 'get',
    create: 'create',
    edit: 'edit',
    listAll: 'listAll',
    delete: 'delete'
}

export const functionType = {
    create: 'create',
    edit: 'edit',
    delete: 'delete'
}

export const entityType = {
    employee: 'employee',
    service: 'service',
    request: 'request'
}

export const columnType = {
    text: 'text',
    date: 'date',
    dropdownList: 'dropdownList'
}

export const empoyeeColumns = [
    {
        id: 'name',
        label: 'Имя',
        minWidth: 170,
        align: 'center',
        type: columnType.text
    },
    {
        id: 'surname',
        label: 'Фамилия',
        minWidth: 170,
        align: 'center',
        type: columnType.text
    },
    {
        id: 'position',
        label: 'Должность',
        minWidth: 170,
        align: 'center',
        type: columnType.text
    }
];

export const serviceColumns = [
    {
        id: 'name',
        label: 'Имя',
        minWidth: 170,
        align: 'center',
        type: columnType.text
    },
    {
        id: 'description',
        label: 'Описание',
        minWidth: 170,
        align: 'center',
        type: columnType.text
    }
];

export const requestColumns = [
    {
        id: 'name',
        label: 'Имя',
        minWidth: 170,
        align: 'center',
        type: columnType.text
    },
    {
        id: 'description',
        label: 'Описание',
        minWidth: 170,
        align: 'center',
        type: columnType.text
    },
    {
        id: 'address',
        label: 'Адресс',
        minWidth: 170,
        align: 'center',
        type: columnType.text
    },
    {
        id: 'requestStatus',
        label: 'Статус заявки',
        minWidth: 170,
        align: 'center',
        type: columnType.dropdownList
    },
    {
        id: 'creationDate',
        label: 'Дата создания заявки',
        minWidth: 170,
        align: 'center',
        type: columnType.date
    },
    {
        id: 'startDate',
        label: 'Дата начала выполнения',
        minWidth: 170,
        align: 'center',
        type: columnType.date
    },    
    {
        id: 'сompletionDate',
        label: 'Дата завершения выполнения',
        minWidth: 170,
        align: 'center',
        type: columnType.date
    },
];

export const employeeTemplate = {
    name: '',
    surname: '',
    position: ''
}

export const serviceTemplate = {
    name: '',
    description: '',
}

export const requestTemplate = {
    name: '',
    description: '',
    address: '',
    requestStatus: '',
    creationDate: '',
    startDate: '',
    сompletionDate: '',
    employees: [],
    services: []
}

export const requestStatus = [
    {
        value: 'Pending',
        title: 'Ожидание'
    },
    {
        value: 'Appointed',
        title: 'Назначена'
    },
    {
        value: 'Performed',
        title: 'Выполняется'
    },
    {
        value: 'Completed',
        title: 'Выполнена'
    },
    {
        value: 'Archived',
        title: 'В архиве'
    }
]

export default { 
    functionType,
    entityType,
    columnType,
    empoyeeColumns,
    serviceColumns,
    requestColumns,
    employeeTemplate,
    serviceTemplate,
    requestTemplate,
    baseUrl,
    services,
    methods,
    requestStatus
};