<script lang="ts">
    import Accordion from "./Accordion.svelte";
    import AccordionItem from "./AccordionItem.svelte";
    import { t } from '../translations';
    import { getEnrichedEventType } from "../models/EnrichedEventType";
    import { getEventsInChosenPeriod } from "../pages/loaders/Statistics";
    import type { AnimalRead, EventRead } from "../api";

    export let animal: AnimalRead;
    export let events: Array<EventRead> = [];
</script>

<Accordion>
    <AccordionItem header={$t({ key: 'home.daily.summary.title' })}>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th></th>
                    <th class="text-center">{$t({ key: 'home.daily.summary.table.header.registered' })}</th>
                    <th class="text-center">{$t({ key: 'home.daily.summary.table.header.expected' })}</th>
                    <th class="text-center">{$t({ key: 'home.daily.summary.table.header.difference' })}</th>
                </tr>
            </thead>
            <tbody>
                {#each animal.tracked_event_types as animalEventTypeAssociation}
                    {@const eventType = getEnrichedEventType(animalEventTypeAssociation.event_type)}
                    {@const todaysEvents = getEventsInChosenPeriod(events, eventType, 1).length}
                    {@const lastSevenDaysEvents = getEventsInChosenPeriod(events, eventType, 7).length / 7}
                    <tr>
                        <td>
                            <i class="fas {eventType.iconClass}"></i>
                        </td>
                        <td class="text-center">{todaysEvents}</td>
                        <td class="text-center">{lastSevenDaysEvents.toFixed(0)}</td>
                        <td class="text-center">{(todaysEvents - lastSevenDaysEvents).toFixed(0)}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </AccordionItem>
</Accordion> 