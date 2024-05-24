import DrugSuggestions from "./cdss-drug-suggestion-scenarios";
import LabTestSuggestions from "./cdss-labtest-suggestion-scenarios";
import QSuggestions from "./cdss-question-suggestion-scenarios";

const ScenarioTypes = [QSuggestions, LabTestSuggestions, DrugSuggestions];
const ScenarioLimits = [
  QSuggestions.length,
  QSuggestions.length + LabTestSuggestions.length,
  DrugSuggestions.length + LabTestSuggestions.length + QSuggestions.length,
];

function getScenario(id) {
  const idInLimits = id % ScenarioLimits[2];
  return idInLimits >= ScenarioLimits[1]
    ? ScenarioTypes[2][idInLimits - ScenarioLimits[1]]
    : idInLimits >= ScenarioLimits[0]
      ? ScenarioTypes[1][idInLimits - ScenarioLimits[0]]
      : ScenarioTypes[0][idInLimits];
}

export default {
  getScenario,
};
