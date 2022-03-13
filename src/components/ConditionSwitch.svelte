<script lang="ts">
    import { AnimalsService } from "../api";
    import { getEnrichedConditionType } from "../models/EnrichedConditionType";
    import { t } from "../translations";
    import type { ConditionSwitchOptions } from "./loaders/ConditionSwitch";

    export let options: ConditionSwitchOptions;
    
    let disabled = false;

    $: title = $t({ key: `condition.type.${options.conditionType.replace(' ', '.').toLowerCase()}.${options.animalHasCondition ? 'enabled' : 'disabled'}` });
</script>

<button type="button" class="btn btn-{options.animalHasCondition ? 'success' : 'primary'}" {disabled} on:click={async () => {
    disabled = true;
    await AnimalsService.toggleConditionAnimalsIdConditionTypePut(options.animalId, options.conditionType);
    options.animalHasCondition = !options.animalHasCondition;
    disabled = false;
}} {title}>
    <i class="fas {getEnrichedConditionType(options.conditionType).iconClass}"></i>
    <div class="d-none d-xxl-inline-block">{title}</div>
</button>