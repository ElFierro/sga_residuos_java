package co.edu.usa.talentotech.sga.model;

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


@Document(collection = "coordinate")
public class Coordinate {
    @Id
    private String id;
    private Double latitude;
    private Double longitude;
    private String address;
    private String icon;
}
