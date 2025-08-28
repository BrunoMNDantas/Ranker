package com.github.brunomndantas.ranker.logic.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Rank {

    private String id;

    private String title;

    private Collection<String> tiersIds;

    private Collection<String> optionsIds;

    private Collection<String> votesIds;

}
