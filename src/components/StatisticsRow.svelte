<script lang="ts">
    import type { EventRead } from "../api";
    import type { EnrichedEventType } from "../models/EnrichedEventType";
    import { t } from "../translations";
    import { getAverage, getMeanOfDifferences } from "../utils/NumberUtils";
    import { getMostFrequentHourFromDates, getTimeSpanFromDatePair, getTimeSpanStringFromMilliseconds, isToday } from "../utils/TimeUtils";

    export let animalId: number | undefined;
    export let events: Array<EventRead>;
    export let eventType: EnrichedEventType;
    export let days: number;

    $: eventsInChosenPeriod = events.filter(e => {
        if(animalId && animalId != e.animal_id) return false;
        if(e.event_type != eventType.eventType) return false;
        if(days == 1) return isToday(Date.parse(e.created));
        return getTimeSpanFromDatePair({
            latest: new Date(),
            earliest: new Date(Date.parse(e.created))
        }).totalDays <= days;
    });
    $: averageRating = getAverage(eventsInChosenPeriod.map(e => e.rating));
    $: averageEvents = eventsInChosenPeriod.length / days;
    $: meanTimeBetweenEvents = getMeanOfDifferences(eventsInChosenPeriod.sort((a, b) => Date.parse(b.created) - Date.parse(a.created)).map(e => Date.parse(e.created)));
</script>

<tr>
    <td>{$t({ key: `event.type.${eventType.eventType.replace(' ', '.').toLowerCase()}` })}</td>
    <td>{eventsInChosenPeriod.length}</td>
    <td>{averageRating?.toFixed(2) || ''}</td>
    <td>{averageEvents.toFixed(2)}</td>
    <td>{getTimeSpanStringFromMilliseconds(meanTimeBetweenEvents)}</td>
    <td>{getMostFrequentHourFromDates(eventsInChosenPeriod.map(event => new Date(Date.parse(event.created)))) || ''}</td>
</tr>

