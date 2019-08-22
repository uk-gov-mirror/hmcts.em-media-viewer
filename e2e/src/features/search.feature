@MediaViewer @Search
Feature: Media Viewer - Search

  Background:
    Given I am on Media Viewer Page
    Then I expect the page header to be "Media Viewer Demo"

  @EM-1246 @MultipleWords_Search
  Scenario Outline: Enable Search within a document
    When the user populate the content search field with a '<keyword_search>'
    Then the "<search_results_count>" are displayed and highlighted to the user
    And the section of the document is viewable to the user

    Examples:
      | keyword_search | search_results_count |
      | Trace Trees    | 1 of 19 matches      |

  @EM-1246 @SingleWord_Search
  Scenario Outline: Enable Search within a document
    When the user populate the content search field with a '<search_word>'
    Then the "<search_results_count>" are displayed and highlighted to the user
    And the section of the document is viewable to the user

    Examples:
      | search_word  | search_results_count |
      | Introduction | 1 of 1 matches       |

  @EM-1246 @No_Search_Results
  Scenario Outline: Enable Search within a document
    When the user populate the content search field with a '<search_word>'
    Then the "<search_results_count>" are displayed and highlighted to the user

    Examples:
      | search_word | search_results_count |
      | Phani Perla | Phrase not found     |
