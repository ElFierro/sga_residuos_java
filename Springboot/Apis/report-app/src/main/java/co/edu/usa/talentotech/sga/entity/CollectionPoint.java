package co.edu.usa.talentotech.sga.entity;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@EqualsAndHashCode(callSuper=false)
@NoArgsConstructor
@ToString


@Document(collection = "collection_points")
public class CollectionPoint {

    @Id
    private String id;
    private String location;
    private String details;
    private String status;

}