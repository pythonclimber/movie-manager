export function formatTitle(title: string): string {
    if (title.startsWith('The ')) {
        return title.substr(4) + ', The'
    } else if (title.startsWith('A ')) {
        return title.substr(2) + ', A'
    } else if (title.startsWith('An ')) {
        return title.substr(3) + ', An'
    }
    return title;
}

export function sortByTitle(item1: any, item2: any) {
    if (item1.Title < item2.Title)
            return -1;
        else if (item1.Title > item2.Title) 
            return 1;
        else
            return 0;
}