<script lang="ts">
    import { AnimalsService, type AnimalRead, type ConditionType } from "../api";
    import { getEnrichedConditionType } from "../models/EnrichedConditionType";
    import { t } from "../translations";

    export let animal: AnimalRead;
    export let conditionType: ConditionType;
    
    let disabled = false;

    $: condition = animal.tracked_conditions.find(condition => condition.condition_type === conditionType);
    $: title = $t({ key: `condition.type.${conditionType.replace(' ', '.').toLowerCase()}.${condition?.is_enabled ? 'enabled' : 'disabled'}` });
</script>

<button type="button" class="btn btn-{condition?.is_enabled ? 'success' : 'primary'}" {disabled} on:click={async () => {
    disabled = true;
    animal = await AnimalsService.toggleConditionAnimalsIdConditionTypePut(animal.id, conditionType);
    disabled = false;
}} {title}>
    <i class="fas {getEnrichedConditionType(conditionType).iconClass}"></i>
    <div class="d-none d-xxl-inline-block">{title}</div>
</button>