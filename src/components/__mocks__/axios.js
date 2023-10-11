export const mockResponse = {
    data: {
      results: [
        {
            id: '1',
            title: 'test-title',
            formats: {'image/jpeg' : 'image-link'},
            authors: [{name: 'author1'}],
            is_checked: false
        },
        {
            id: '2',
            title: 'test-title2',
            formats: {'image/jpeg' : 'image-link2'},
            authors: [{name: 'author2'}],
            is_checked: false
        },
        {
            id: '3',
            title: 'test-title',
            formats: {'image/jpeg' : 'image-link'},
            authors: [{name: 'author3'}],
            is_checked: false
        }
      ]
    }
}
export default {
    get: jest.fn().mockResolvedValue(mockResponse)
}