import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime);

const RelativeTime = ({ timestamp }) => {

    if (!timestamp) return <span>No date provided</span>;
    const timeAgo = dayjs(timestamp).fromNow();

    return <span>{timeAgo}</span>;
}

export default RelativeTime