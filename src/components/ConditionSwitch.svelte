<script lang="ts">
    import { AnimalsService, type AnimalRead, type ConditionType } from "../api";
    import { getEnrichedConditionType } from "../models/EnrichedConditionType";
    import { t } from "../translations";
    import { getTimeSpanFromDatePair, getTimeSpanString } from "../utils/TimeUtils";

    export let animal: AnimalRead;
    export let conditionType: ConditionType;
    
    let disabled = false;

    $: condition = animal.tracked_conditions.find(condition => condition.condition_type === conditionType);
    $: lastUpdated = condition?.updated ? getTimeSpanFromDatePair({
        earliest: new Date(Date.parse(condition.updated)),
        latest: new Date()
    }) : undefined;
    $: title = $t({ key: `condition.type.${conditionType.replace(' ', '.').toLowerCase()}.${condition?.is_enabled ? 'enabled' : 'disabled'}` }) + ': ' + (lastUpdated ? $t({ key: 'last.updated.timespan', substitutions: [getTimeSpanString(lastUpdated)] }) : '');
</script>

<button type="button" class="btn btn-{condition?.is_enabled ? 'primary' : 'secondary'}" {disabled} on:click={async () => {
    disabled = true;
    animal = await AnimalsService.toggleConditionAnimalsIdConditionTypePut(animal.id, conditionType);
    disabled = false;
}} {title}>
    <i class="fas {getEnrichedConditionType(conditionType).iconClass}"></i>
    <div class="d-none d-xxl-inline-block">{title}</div>
</button>